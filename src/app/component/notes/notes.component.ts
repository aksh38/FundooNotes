import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Note } from 'src/app/model/note.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, CanColor} from '@angular/material';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { NoteDto } from 'src/app/model/noteDto.model';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { GetNoteDto } from 'src/app/model/getNotes.model';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private notes:Note[];
  private noteDto:NoteDto= new NoteDto;
  private expand:boolean=false;
  private colorsPallete: string[][]=[['white','lightblue','lightcoral','lightgray'],
                                 ['lightgreen','lightpink','lightsalmon','lightyellow'],
                                ['lightcyan','lightskyblue','lightseagreen']];
  private myColor:string='white'; 
  private archivedNotes:Note[];
  private trashedNotes:Note[];

  constructor(private noteService:NotesService, private dialog:MatDialog, private snackBar:MatSnackBar,private router:Router) { 

      this.getUserNotes();
    
  }

  ngOnInit() {
   
  }
  ngAfterInit()
  {
    
  }
  getUserNotes()
  {
    this.noteService.getNotes(false, false, false).subscribe(
      (data)=> {
        this.notes=data;
      }
    )
  }

  getArchivedNotes()
  {
    this.noteService.getNotes(true, false, false).subscribe(
      (data)=> {
        this.archivedNotes=data;
      }
    )
  }
  openCreateDialog(note:Note):void
  {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      
      this.getUserNotes;
          });
  }

  expandCreateBar()
  {
    this.expand= true;
  }

  closeCreateBar()
  {
    if(this.noteDto.title!==undefined)
    {
    this.noteService.createNote(this.noteDto)
    .subscribe((response:any)=>
    {
      if(response.statusCode==200)
      {
        this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
        this.ngOnInit;
      }
      else
      {
        this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
      }
    });
  }
    this.expand=false;
    
  }

  changeColor(color:string)
  {
    this.myColor=color;
  }
  changeColor2(color:string, note:Note)
  {
    note.color=color;
    this.noteService.updateNote(note).subscribe((response:any)=>
    {
      if(response.statusCode==200)
      {
        this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
        this.router.navigateByUrl('home');
      }
      else
      {
        this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
      }
    });
    }

    archiveNote(note:Note)
    {
      this.noteService.archiveNote(note).subscribe((response:any)=>
      {
        if(response.statusCode==200)
        {
          this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
          this.router.navigateByUrl('home');
        }
        else
        {
          this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
        }
      });
    }

}
