import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Note } from 'src/app/model/note.model';
import { NotesService } from 'src/app/service/notes.service';
import { LabelService } from 'src/app/service/label.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { NoteDto } from 'src/app/model/noteDto.model';
import { Label } from 'src/app/model/label.model';
import { ViewDto } from 'src/app/model/view.model';
import { LabelDto } from 'src/app/model/labelDto.model';
import { UpdateNotesService } from 'src/app/service/update-notes.service';
import { ChangeViewService } from 'src/app/service/change-view.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleNoteComponent implements OnInit {

  @Input() private myNote:Note=new Note();
  private noteDto: NoteDto = new NoteDto;
  private expand: boolean = false;
  private labels: Label[];
  private show: boolean = false;
  private viewDto = new ViewDto();
  private notes:Note[];
  private pinnedNotes:Note[];
  private view:string;
  private colorsPallete: string[][] = [['white', 'lightblue', 'lightcoral', 'lightgray'],
  ['lightgreen', 'lightpink', 'lightsalmon', 'lightyellow'],
  ['lightcyan', 'lightskyblue', 'lightseagreen', 'tan']];
  
  private myColor: string = 'white';
  private searchLabelValue: string;

  constructor(
    private noteService:NotesService,
    private labelService:LabelService,
    private updateService:UpdateNotesService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog,
    private router:Router
  ) { 
    this.getLabels();
  }

  ngOnInit() {
    
  }

  pinIt(note: Note) {
    note.archive=false;
    this.noteService.pinNote(note).subscribe((response: any) => {
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
    });
    this.updateService.changeUpdate(false, false);
  }
  openCreateDialog(note: Note): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '600px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateService.changeUpdate(false,false);
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
            this.ngOnInit;
          }
          else {
            this.updateService.changeUpdate(false, false);

            this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
          }
        });
    }
    this.expand = false;

  }

  changeColor(color: string) {
    this.myColor = color;
  }
  changeColor2(color: string, note: Note) {
    note.color = color;
    this.noteService.updateNote(note).subscribe((response: any) => {
      if (response.statusCode == 200) {
        this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
        this.updateService.changeUpdate(false, false);
      }
      else {
        this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
        this.updateService.changeUpdate(false, false);
      }
    });
  }

  archiveNote(note: Note) {
    note.pin = false;
    this.noteService.archiveNote(note).subscribe((response: any) => {
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
    });
    this.updateService.changeUpdate(false, false);
  }

  unArchiveNote(note: Note) {
    this.noteService.archiveNote(note).subscribe((response: any) => {
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
      this.updateService.changeUpdate(true, false);
    });
  }

  trashNote(note: Note) {
    this.noteService.trashNote(note).subscribe((response: any) => {
      this.updateService.changeUpdate(false, true);
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
    });
  }

  getLabels() {
    this.labelService.getLabels().subscribe(
      (data) => this.labels = data
    )
  }
  stopPropagation(event) {
    event.stopPropagation();
  }

  onSearchChange(searchValue: string) {
    if (!searchValue) {
      this.show = false;
      this.getLabels();
    }
    else {
      this.show = true;
      this.labels = this.labels.filter(label => label.labelValue.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
      this.searchLabelValue = searchValue;
    }
  }
  addLabelToNote(event, labelId: LongRange, noteId: LongRange) {
    this.noteService.addLabelToNote(labelId, noteId)
      .subscribe(
        (response: any) => {
          this.getLabels();
          this.updateService.changeUpdate(false, false);
          this.snackBar.open(response.statusMessage, "", { duration: 5000, verticalPosition: "top" });

        }
      );
  }

  removeLabel(labelId: LongRange, noteId: LongRange) {
    this.noteService.removeLabelToNote(labelId, noteId)
      .subscribe(
        (response: any) => {
          this.getLabels();
          this.updateService.changeUpdate(false, false);
          this.snackBar.open(response.statusMessage, "", { duration: 5000, verticalPosition: "top" });
        }
      );
  }

  createNewLabel(event, noteId: LongRange, labelValue: string) {
    let labelDto = new LabelDto();
    labelDto.labelValue = labelValue;
    this.labelService.createLabel(labelDto).subscribe(
      (response: any) => {
        this.getLabels();
        this.snackBar.open(response.statusMessage, "", { duration: 3000, verticalPosition: "top" })
        this.labelService.getLabel(labelValue).subscribe(
          (label: Label) => {
            this.addLabelToNote(event, label.labelId, noteId);
          }
        )

      })
    this.noteService.addLabelToNote
  }

  change(flag:boolean)
  {
    if(flag)
    {
      this.viewDto.viewClass="noteList";
    }
    else
    {
      this.viewDto.viewClass="noteGrid";
    }
  }
}
