import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'src/app/model/label.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelService } from 'src/app/service/label.service';
import { Note } from 'src/app/model/note.model';
import { ChangeViewService } from 'src/app/service/change-view.service';
import { ViewDto } from 'src/app/model/view.model';

@Component({
  selector: 'app-labeled-note',
  templateUrl: './labeled-note.component.html',
  styleUrls: ['./labeled-note.component.css']
})
export class LabeledNoteComponent implements OnInit {
  private labelValue:String;
  private label:Label;
  private notes:Note[];
  private pinnedNotes:Note[];
  private viewDto: ViewDto=new ViewDto();
  constructor(
    private activatedRoute:ActivatedRoute, 
    private labelService:LabelService,
    private router:Router,
    private changeView:ChangeViewService) { 
    this.labelValue=this.activatedRoute.snapshot.params['labelValue'];
    console.log(this.labelValue)
    this.getLabeledNotes();
  }

  ngOnInit() {
    
    this.router.events.subscribe(
      (e:any)=>
        {
           this.labelValue=this.activatedRoute.snapshot.params['labelValue'];
           this.getLabeledNotes();
        }
      );

    this.changeView.currentView.subscribe(
      response=>
      this.change(response)
    )

  }

  getLabeledNotes()
  {
    this.labelService.getLabeledNotes(this.labelValue).subscribe(
      (data)=>{
        this.pinnedNotes=data.filter((lbl)=> lbl.pin===true);
        this.notes=data.filter(lbl=> lbl.pin!==true);
      });
  }

  change(flag:boolean)
  {
    if(flag)
    {
      this.viewDto.viewStyle="column wrap";
    }
    else
    {
      this.viewDto.viewStyle="row wrap";
    }
  }
}
