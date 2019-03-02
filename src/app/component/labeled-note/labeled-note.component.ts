import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'src/app/model/label.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelService } from 'src/app/service/label.service';
import { Note } from 'src/app/model/note.model';
import { ChangeViewService } from 'src/app/service/change-view.service';
import { ViewDto } from 'src/app/model/view.model';
import { AllNotes } from 'src/app/model/allNotes.model';

@Component({
  selector: 'app-labeled-note',
  templateUrl: './labeled-note.component.html',
  styleUrls: ['./labeled-note.component.css']
})
export class LabeledNoteComponent implements OnInit {
  private labelValue:String;
  private label:Label;
  private notes=new Array<AllNotes>();
  private pinnedNotes=new Array<AllNotes>();
  private viewDto: ViewDto=new ViewDto();
  constructor(
    private activatedRoute:ActivatedRoute, 
    private labelService:LabelService,
    private router:Router,
    private changeView:ChangeViewService) { 
    this.labelValue=this.activatedRoute.snapshot.params['labelValue'];
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
    );

  }

  getLabeledNotes()
  {
    this.pinnedNotes=[];
    this.notes=[];
    this.labelService.getLabeledNotes(this.labelValue).subscribe(
      (data)=>{
        data.filter((lbl)=> lbl.note.pin===true).map(lbl=> this.pinnedNotes.push(lbl));
        data.filter(lbl=> lbl.note.pin!==true).map(lbl=> this.notes.push(lbl));
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
