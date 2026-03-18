import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {

  private currentUserRole = 'admin';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRole(requiredRole: string) {

    this.viewContainer.clear();

    if (this.currentUserRole === 'admin') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }

    else if (this.currentUserRole === 'user' && requiredRole === 'user') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}