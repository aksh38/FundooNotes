import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private password:String;
  private password2:String;
  private token:String;

  constructor(private userService:UserService, private route:ActivatedRoute, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.token = param.token});
  }
  resetPassword()
  {
      this.userService.resetPassword(this.password, this.password2, this.token).subscribe((response:any)=>
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
      });;
  }
}
