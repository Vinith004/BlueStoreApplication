import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private service:SharedService,private router:Router){}

  canActivate(){
    if(this.service.IsLoggedIn()){
      return true;  
    }
    this.router.navigate([''])
    return false;
  }
  
}
