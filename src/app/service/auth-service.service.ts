import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router) {
   }

  canActivate()
  {
    if(localStorage.getItem("userName")!==undefined)
    {

      console.log(localStorage.getItem("userName"))
      return true;
    }
    else{
      console.log(localStorage.getItem("userName"))
      this.router.navigateByUrl("");
      return false;
    }
  }
}
