import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[forRoles]',
})
export class ForRolesDirective {
  roles!: string[];

  @Input()
  set forRoles(roles: string[]) {
    if (roles.length) {
      this.roles = Array.isArray(roles) ? roles : [roles];
      this.roles = this.roles.map((r) => r.toUpperCase());
    } else {
      this.roles = [];
    }

    this.authService.getUserRoles$().subscribe((roles) => {
      if (roles && !this.roles.every((value, i) => value === roles[i])) {
        this.viewContainer.clear();
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
  ) {}
}
