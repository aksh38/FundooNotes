import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/model/label.model';
import { LabelService } from 'src/app/service/label.service';
import { Collaborator } from 'src/app/model/collaborator.model';
import { CollabUserInfo } from 'src/app/model/collabUser.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private fields:string[]=["Types","Labels","People","Colours"]; 
  private labels:Label[];
  private collaborators:CollabUserInfo[];
  private fieldsContent:any[][]=[
    ["Reminders","Images"],
    this.labels,
    this.collaborators,
    [
    'white', 'lightblue', 'lightcoral', 'lightgray',
    'lightgreen', 'lightpink', 'lightsalmon', 'lightyellow',
    'lightcyan', 'lightskyblue', 'lightseagreen', 'tan'
    ]
  ]

  constructor(private labelService:LabelService,
              private userService:UserService) {
    this.getLabels();
    this.getCollaborators();
   }

  ngOnInit() {
  }

  getLabels()
  {
    this.labelService.getLabels().subscribe(
      (data)=>{
        this.labels=data;
      }
    )
  }
  getCollaborators()
  {
    this.userService.getUserDetails().subscribe(
      (data)=>{
        this.collaborators=data;
      }
    )
  }
}
