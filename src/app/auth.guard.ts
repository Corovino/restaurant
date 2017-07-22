import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router ){}
  canActivate(){
     this.auth.getUserLoggedIn().map((auth) => {
      if (!auth) {
        console.log(auth);
        this.router.navigate(['/login']);
        return false;
      }
      this.router.navigate(['/dashboard']);
      return true;
    });
    return true;
  }





}
