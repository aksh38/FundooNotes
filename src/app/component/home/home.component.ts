import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private userName: String;
  private email:String;
  private data:User;
  constructor(private userService:UserService) { 
     this.userName=localStorage.getItem("userName");
     this.userService.getUser(this.userName).subscribe((result)=>{
     this.data=result;
     this.email=this.data.emailId;
     }); 
  }
  ngOnInit() {

    this.userService;

  }

}
