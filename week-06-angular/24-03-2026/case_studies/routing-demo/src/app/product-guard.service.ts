import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id) || id <= 0) {
      alert('Invalid product ID.');
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
