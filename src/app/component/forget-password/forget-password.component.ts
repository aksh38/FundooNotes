import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service'
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  private userName: string;
  constructor(private userService : UserService, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit() {  

  }

  onForgetPassword()
  {
    this.userService.forgetPassword(this.userName)
                    .subscribe((response:any)=>
                    {
                      this.snackBar.open(response.body.statusMessage, "", {duration:5000, verticalPosition:"top"});  
                    });
  }
}
