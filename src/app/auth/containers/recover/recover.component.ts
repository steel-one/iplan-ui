import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverComponent implements OnInit {
  loading$ = new BehaviorSubject(false);

  isRequestSent$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public recoveryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
  ) {}

  ngOnInit(): void {
    this.isRequestSent$.next(false);
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.recoveryForm.controls;
  }

  recover() {
    this.loading$.next(true);
    this.passwordService
      .requestRecovery(this.f['email'].value)
      .subscribe(() => {
        this.loading$.next(false);
        this.isRequestSent$.next(true);
      });
  }
}
