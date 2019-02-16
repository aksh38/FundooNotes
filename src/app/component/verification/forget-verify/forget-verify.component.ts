import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forget-verify',
  templateUrl: './forget-verify.component.html',
  styleUrls: ['./forget-verify.component.css']
})
export class ForgetVerifyComponent implements OnInit {

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
        this.router.navigateByUrl("/resetPassword/"+this.token);
      }
      else
      {
        this.snackBar.open(response.body.statusMessage, "", {duration:2000, verticalPosition:"top"});
      }
    });
    
  }

}
