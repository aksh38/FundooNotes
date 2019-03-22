import { Component, OnInit } from '@angular/core';
import { UserService} from '../../service/user.service';
import { Login } from '../../model/login.model';
import{MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginmodel:Login=new Login();
  constructor(private userService : UserService,
              private snackBar:MatSnackBar,
              private router:Router) { }

  ngOnInit() {  

  }

  loginUser()
  {
    this.userService.loginUser(this.loginmodel)
    .subscribe((response:any)=>
    {
      if(response.body.statusCode==200)
      {
        this.snackBar.open(response.body.statusMessage, "", {duration:2000, verticalPosition:"top"});
        localStorage.setItem("token", response.headers.get("jwt_token"));
        localStorage.setItem("userName", this.loginmodel.userName);
        this.router.navigateByUrl("home");
      }
      else
      {
        this.snackBar.open(response.body.statusMessage, "", {duration:2000, verticalPosition:"top"});
      }
    });
  }

}
