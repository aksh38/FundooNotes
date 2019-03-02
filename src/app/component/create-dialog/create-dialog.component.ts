import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/model/note.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {
  
  private colorsPallete: string[][]=[['white','lightblue','lightcoral','lightgray'],
                                     ['lightgreen','lightpink','lightsalmon','lightyellow'],
                                     ['lightcyan','lightskyblue','lightseagreen','tan']];
  private myColor:String;
  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)private  data:Note,
    public noteService:NotesService,
    private snackBar:MatSnackBar
    ) {
      this.dialogRef.addPanelClass('create-dialog');
      this.myColor=data.color;
    }

  ngOnInit() {
    
  }
  onClick(): void {
    this.noteService.updateNote(this.data).subscribe((response:any)=>
    {
        this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
    });
    this.dialogRef.close();
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
      }
      else
      {
        this.snackBar.open(response.statusMessage, "", {duration:2000, verticalPosition:"top"});
      }
    });
    }
}