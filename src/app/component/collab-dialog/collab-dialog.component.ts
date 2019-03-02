import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AllNotes } from 'src/app/model/allNotes.model';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';
import { UserInfo } from 'src/app/model/userInfo.model';
import { CollaboratorService } from 'src/app/service/collaborator.service';
import { Note } from 'src/app/model/note.model';
import { CollaboratorDto } from 'src/app/model/collaboratorDto.model';

@Component({
  selector: 'app-collab-dialog',
  templateUrl: './collab-dialog.component.html',
  styleUrls: ['./collab-dialog.component.css']
})
export class CollabDialogComponent implements OnInit {

  private userName:string;
  private user:UserInfo=new UserInfo();
  private userInfos:UserInfo[];
  private emailId:string;
  private show:boolean;
  private userId:LongRange;
  private userIds=new Array<LongRange>();
  constructor( 
    public dialogRef: MatDialogRef<CollabDialogComponent>,
    @Inject(MAT_DIALOG_DATA)private  data:AllNotes,
    private userService:UserService,
    private collabService:CollaboratorService,
    private snackBar:MatSnackBar
    ) {
      this.userInfos=data.collabUserInfos;
      this.getOwnerDetails();
    }
  ngOnInit() {

  }

  getOwnerDetails()
  {

     this.userIds.push(this.data.note.userId);
     this.userService.collabDetails(this.userIds).subscribe(
       result=>
       {
         this.user=result.pop();
         this.userName=this.user.userName;
         this.emailId=this.user.emailId;
       }
     )
  }

  getUser(emailId:string)
  {
    this.userService.getUserBtEmailId(emailId).subscribe(
      (data)=>
      this.userId=data
    )
  }

  addCollab()
  {
      let collab=new CollaboratorDto();
      collab.noteId=this.data.note.noteId;
      collab.userId= this.userId;
      console.log(collab);
      this.collabService.addCollaborator(collab).subscribe(
        (response:any)=> {
        if(response.statusCode==200){
        this.snackBar.open(response.statusMessage,"",{duration:3000})
      }
      else{
        this.snackBar.open("Enter valid email","",{duration:3000})

      }
    }
      ) 
  }
  
  removeCollab(userInfo:UserInfo)
  {
    this.userService.getUserBtEmailId(userInfo.emailId).subscribe(
      (data)=>
      this.userId=data
    )
  }
}
