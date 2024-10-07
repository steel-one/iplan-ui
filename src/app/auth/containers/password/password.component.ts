import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getFormControlError } from '@common/functions/getFormControlError';
import { Token } from '@models/token';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  loading$ = new BehaviorSubject(false);

  public email!: string;
  public fg!: FormGroup;
  public recovery: boolean = false;
  public task!: string;
  private code!: string;

  hide = signal(true);

  hideShowPassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.email = this.activeRoute.snapshot.queryParams['email'];
    this.code = this.activeRoute.snapshot.queryParams['code'];
    this.recovery = this.activeRoute.snapshot.queryParams['recovery'];
    this.task = this.recovery ? 'Recover' : 'Set';

    this.fg = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.fg.controls;
  }

  getErrorMessage(controlName: string): string {
    return getFormControlError(this.fg, controlName);
  }

  setPassword() {
    this.loading$.next(true);
    let task: Observable<Token>;
    if (this.recovery) {
      task = this.passwordService.recover(
        this.email,
        this.code,
        this.f['password'].value,
      );
    } else {
      task = this.passwordService.setup(
        this.email,
        this.code,
        this.f['password'].value,
      );
    }
    task
      .pipe(tap((data) => this.authService.doLoginUser(data)))
      .subscribe(() => {
        this.router.navigate([this.authService.LOGIN_PATH]);
      });
  }
}
