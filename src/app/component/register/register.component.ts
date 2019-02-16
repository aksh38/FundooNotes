import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private usermodel:User = new User();
  
  constructor(private userService:UserService, private snackBar:MatSnackBar, private router:Router ) { }

  ngOnInit() {
  }

  onRegister()
  {
    this.userService.registerUser(this.usermodel)
                    .subscribe((response:any)=>
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
