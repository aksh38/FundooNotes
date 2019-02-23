import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note.model';
import { NotesService } from 'src/app/service/notes.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {

  private trashedNotes:Note[];

  constructor(private noteService:NotesService, private snackBar:MatSnackBar) {
    this.getTrashNotes();
   }

  ngOnInit() {
  }
  getTrashNotes()
  {
    this.noteService.getNotes(false, true).subscribe(
      (data)=> {
        this.trashedNotes=data;
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
}
