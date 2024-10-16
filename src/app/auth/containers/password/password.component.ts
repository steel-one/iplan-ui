import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { getFormControlError } from '@functions/getFormControlError';
import { Token } from '@models/token';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TrimDirective } from '@lib/component-tools/trim-directive';
import { LoaderComponent } from '../../../../common-ui/loader/loader.component';
import { AuthService } from '../../services/auth.service';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    LoaderComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TrimDirective,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatError,
    MatButton,
    AsyncPipe,
  ],
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
