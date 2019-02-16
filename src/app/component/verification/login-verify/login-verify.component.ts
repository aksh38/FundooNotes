import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-verify',
  templateUrl: './login-verify.component.html',
  styleUrls: ['./login-verify.component.css']
})
export class LoginVerifyComponent implements OnInit {

  private token:String;

  constructor(private userService:UserService, private routes : ActivatedRoute, private router:Router, private snackBar:MatSnackBar){ }

  ngOnInit() {
    this.routes.params.subscribe(param => {
      this.token = param.token});
  }

  emailVerify()
  {
    this.userService.verifyUser(this.token).subscribe((response:any)=>
    {
      if(response.body.statusCode==200)
      {
        this.snackBar.open(response.body.statusMessage, "", {duration:2000, verticalPosition:"top"});
        this.router.navigateByUrl("/login");
      }
      else
      {
        this.snackBar.open(response.body.statusMessage, "", {duration:2000, verticalPosition:"top"});
      }
    });
  }

}
