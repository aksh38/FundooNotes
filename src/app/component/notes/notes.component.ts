import { Component, OnInit} from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Note } from 'src/app/model/note.model';
import { MatDialog, MatSnackBar} from '@angular/material';
import { NoteDto } from 'src/app/model/noteDto.model';
import { Router } from '@angular/router';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';
import { UpdateNotesService } from 'src/app/service/update-notes.service';
import { ViewDto } from 'src/app/model/view.model';
import { ChangeViewService } from 'src/app/service/change-view.service';
import { TotalNotes } from 'src/app/model/totalNoteDto.model';
import { AllNotes } from 'src/app/model/allNotes.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private allNotes2=new Array<AllNotes>();
  private notes= new Array<AllNotes>();
  private pinnedNotes= new Array<AllNotes>();
  private expand:boolean=false;
  private viewDto=new ViewDto();
  private noteDto=new NoteDto();
  private labels:Label[];

  constructor(
    private noteService: NotesService,
    private labelService:LabelService,
    private changeView:ChangeViewService,
    private snackBar: MatSnackBar,
    private router: Router,
    private updateService:UpdateNotesService) {
    
    this.changeView.currentView.subscribe(
      response=>
      this.change(response)
    )
    this.getLabels(); 
    this.updateService.changeUpdate(false, false).subscribe(
      response=>
      {
      this.allNotes2=response;
      this.notesFilter();
      }
    )
    
  }

  ngOnInit() {
  
  }

  getLabels() {
    this.labelService.getLabels().subscribe(
      (data) => this.labels = data
    )
  }
  pinIt(note: Note) {
    this.noteService.pinNote(note).subscribe((response: any) => {
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
    });
  }
  
  expandIt() {
    this.expand = true;

  }

  closeCreateBar(title:string, desc:string) {
    this.expand=false;
    this.noteDto.title=title;
    this.noteDto.description=desc;
    console.log(title);
    console.log(desc);
    if (this.noteDto.title !== "" || this.noteDto.description!=="") {
      this.noteService.createNote(this.noteDto)
        .subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.updateService.changeUpdate(false, false);            
            this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
          }
          else {
            this.updateService.changeUpdate(false, false);            
            this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
          }
        });
    }
    else{
      console.log("error is hjere")
    }
    
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

  notesFilter()
  {
    this.pinnedNotes=[];
    this.notes=[];
    this.allNotes2.filter(note=> note.note.pin===true).map(note=> this.pinnedNotes.push(note));
    this.allNotes2.filter(note=> note.note.pin===false).map(note=> this.notes.push(note));

    console.log("After filter")
    console.log(this.pinnedNotes.length);
    console.log(this.notes)
  }
}
