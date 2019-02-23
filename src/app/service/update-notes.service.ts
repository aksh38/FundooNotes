import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from '../model/note.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateNotesService {

  private allNotes=new BehaviorSubject([]);
  currentNote=this.allNotes.asObservable();
  private trashed:boolean=false;
  private archived:boolean=false;
  
  constructor(private noteService:NotesService) {

    this.noteService.getNotes( this.archived, this.trashed).subscribe(
      response=>
      {
        this.allNotes.next(response)
      },
      error=>
      {
        console.log(error);
      }
    )
   }

   changeUpdate( archived:boolean, trashed: boolean)
   {
     this.archived=archived;
     this.trashed=trashed;

      this.noteService.getNotes( this.archived, this.trashed).subscribe(
      response=>
      {
        this.allNotes.next(response)
      },
      error=>
      {
        console.log(error);
      }
    )
    return this.allNotes.asObservable();
   }
}
