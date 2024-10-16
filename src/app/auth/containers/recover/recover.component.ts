import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { getFormControlError } from '@functions/getFormControlError';
import { BehaviorSubject } from 'rxjs';
import { TrimDirective } from '@lib/component-tools/trim-directive';
import { LoaderComponent } from '../../../../common-ui/loader/loader.component';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    LoaderComponent,
    ReactiveFormsModule,
    MatFormField,
    TrimDirective,
    MatInput,
    MatError,
    MatButton,
    AsyncPipe,
  ],
})
export class RecoverComponent implements OnInit {
  loading$ = new BehaviorSubject(false);

  isRequestSent$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public fg!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
  ) {}

  ngOnInit(): void {
    this.isRequestSent$.next(false);
    this.fg = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.fg.controls;
  }

  getErrorMessage(controlName: string): string {
    return getFormControlError(this.fg, controlName);
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
