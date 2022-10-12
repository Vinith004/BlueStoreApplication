import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor (private service:SharedService,private router:Router){}

  canActivate(){
    if(localStorage.getItem('Role') == "Admin"){
      return true;  
    }
    this.router.navigate(['/Home'])
    return false;
  }
}
