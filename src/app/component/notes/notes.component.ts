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

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private allNotes: Note[];
  private notes: Note[];
  private pinnedNotes: Note[];
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

  }

  ngOnInit() {
    this.updateService.changeUpdate(false, false).subscribe(
      response=>{
        console.log(response);
        response.forEach(note=> note.archive=false);
      this.allNotes=response;
      this.notesFilter();
      }
    );
   
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
  
  expandCreateBar() {
    this.expand = true;

  }

  closeCreateBar() {
    if (this.noteDto.title !== undefined) {
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
    this.expand = false;

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
    this.pinnedNotes=this.allNotes.filter(note=> note.pin===true);
    this.notes=this.allNotes.filter(note=> note.pin===false);
  }
}
