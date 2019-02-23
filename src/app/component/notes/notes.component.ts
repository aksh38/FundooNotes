import { Component, OnInit} from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Note } from 'src/app/model/note.model';
import { MatDialog, MatSnackBar} from '@angular/material';
import { NoteDto } from 'src/app/model/noteDto.model';
import { Router } from '@angular/router';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';
import { UpdateNotesService } from 'src/app/service/update-notes.service';

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
  private noteDto=new NoteDto();
  private labels:Label[];

  constructor(
    private noteService: NotesService,
    private labelService:LabelService,
    private snackBar: MatSnackBar,
    private router: Router,
    private updateService:UpdateNotesService) {
    
    this.getLabels();

  }

  ngOnInit() {
    this.updateService.changeUpdate(false, false).subscribe(
      response=>{
        console.log(response);
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

  

  notesFilter()
  {
    this.pinnedNotes=this.allNotes.filter(note=> note.pin===true);
    this.notes=this.allNotes.filter(note=> note.pin===false);
  }
}
