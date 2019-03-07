import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';
import { Router } from '@angular/router';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';
import { MatDialog } from '@angular/material';
import { ChangeViewService } from 'src/app/service/change-view.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private userName: String;
  private email:String;
  private data:User;
  private labels:Label[];
  private show:boolean=false;

  constructor(private userService:UserService, 
              private labelService:LabelService,
              private imageService:ImageService, 
              private router:Router,
              private dialog:MatDialog,
              private changeViewService:ChangeViewService) { 
    this.getLabels();
     this.userName=localStorage.getItem("userName");
     this.userService.getUser(this.userName).subscribe((result)=>{
     this.data=result;
     this.email=this.data.emailId;
     }); 
  }
  ngOnInit() {

  }

  getLabels()
  {
    this.labelService.getLabels().subscribe(
      (data)=> this.labels=data
    );
  }

  openLabelDialog():void
  {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
      width: '320px',
      data: this.labels
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLabels();
          });
  }

  openImageDialog():void
  {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.imageService.upload(result).subscribe(
        data=> console.log(data)
      )
    });
  }

  changeView(show:boolean)
  {
    this.show=!show;
    this.changeViewService.changeView();
  }
}
