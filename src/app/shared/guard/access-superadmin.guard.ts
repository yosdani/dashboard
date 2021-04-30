import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessSuperadminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser.user.role == 'superadmin'){
            return true;
        }
        this.router.navigate(['/']);
        return false;
  }
}
