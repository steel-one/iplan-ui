import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  loading$ = new BehaviorSubject(false);

  isConfirmed = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const email = this.activeRoute.snapshot.queryParams['email'];
    const code = this.activeRoute.snapshot.queryParams['code'];

    if (email && code) {
      this.authService
        .confirm(email, code)
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.loading$.next(true);
          this.isConfirmed = true;
          this.router.navigate([this.authService.LOGIN_PATH]);
        });
    }
  }
}
