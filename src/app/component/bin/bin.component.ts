import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note.model';
import { NotesService } from 'src/app/service/notes.service';
import { MatSnackBar } from '@angular/material';
import { ViewDto } from 'src/app/model/view.model';
import { ChangeViewService } from 'src/app/service/change-view.service';
import { AllNotes } from 'src/app/model/allNotes.model';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {

  private trashedNotes:Note[];
  private viewDto:ViewDto=new ViewDto();
  constructor(
    private noteService:NotesService, 
    private snackBar:MatSnackBar,
    private changeView:ChangeViewService
    ) {

      this.changeView.currentView.subscribe(
        response=>
        this.change(response)
      )
    this.getTrashNotes();
   }

  ngOnInit() {
  }
  getTrashNotes()
  {
    this.noteService.getNotes(false, true).subscribe(
      (data:AllNotes[])=> {
        data.filter(note=> this.trashedNotes.push(note.note));
      }
    )
  }

  deleteNote(note:Note)
  {
    this.noteService.deleteNote(note).subscribe((response:any)=>
    {
        this.getTrashNotes();
        this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
    }); 
  }

  restoreNote(note:Note)
  {
    this.noteService.trashNote(note).subscribe((response:any)=>
        {
            this.getTrashNotes();
            this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
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
