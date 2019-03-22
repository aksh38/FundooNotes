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
import { AllNotes } from 'src/app/model/allNotes.model';
import { CollabDialogComponent } from '../collab-dialog/collab-dialog.component';
import { UserInfo } from 'src/app/model/userInfo.model';
import { UserService } from 'src/app/service/user.service';
import { ReminderTimeSelect } from 'src/app/model/reminderTime.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleNoteComponent implements OnInit {

  @Input() private myNote:AllNotes=new AllNotes();
  private noteDto: NoteDto = new NoteDto;
  private expand: boolean = false;
  private labels: Label[];
  private currentTime:Date=new Date();
  private show: boolean = false;
  private show2: boolean = false;
  private display:boolean=false;
  private currentDate=new Date();
  private viewDto = new ViewDto();
  private view:string;
  private userInfos:UserInfo[];
  private colorsPallete: string[][] = 
  [['white', 'lightblue', 'lightcoral', 'lightgray'],
  ['lightgreen', 'lightpink', 'lightsalmon', 'lightyellow'],
  ['lightcyan', 'lightskyblue', 'lightseagreen', 'tan']];
  
  private timings:  string[]= [
    "Doesn't repeat",
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
  ];
  private myColor: string = 'white';
  private searchLabelValue: string;
  private selectDisabled:boolean=false;
  constructor(
    private noteService:NotesService,
    private labelService:LabelService,
    private updateService:UpdateNotesService,
    private userService:UserService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog,
    private router:Router,
    private datePipe:DatePipe
  ) { 
    }

  ngOnInit() {
   
    this.getLabels();   
  }

  pinIt(note: Note) {
    note.archive=false;
    this.noteService.pinNote(note).subscribe((response: any) => {
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
      this.updateService.changeUpdate(false, false);
    });
   
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
  focusInput(myInput) {

    myInput.focus();
}
  displaySelect()
  {
    this.display=!this.display;
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
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
      this.updateService.changeUpdate(false, false);
    });
  }

  archiveNote(note: Note) {
    note.pin = false;
    this.noteService.archiveNote(note).subscribe((response: any) => {
      this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" });
      this.updateService.changeUpdate(false, false);
    });
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

  setTimeDate(value:string)
  {
    document.getElementById("time").nodeValue = value;
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
    console.log("event data")
    console.log(event)
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

  openCollabDialog(note:AllNotes)
  {
    const dialogRef = this.dialog.open(CollabDialogComponent, {
      width: '600px',
      data:note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateService.changeUpdate(false,false);
    }); 
  }

  setMenu(show:boolean, event)
  {
    this.show2=show;
    this.stopPropagation(event);
  }

  setSelect()
  {
    this.selectDisabled=!this.selectDisabled;
  }

  setReminder(date:string, time:number, repeat:string, note:Note)
  {
    date=this.datePipe.transform(date,'yyyy-MM-dd');
    note.reminder=new Date(date+"T"+time);
    this.noteService.updateNote(note).subscribe(
      (response:any)=>{
        this.snackBar.open(response.statusMessage, "", {duration:5000});
      }
    )
  }

  removeReminder(note:Note)
  {
    note.reminder=null;
    this.noteService.updateNote(note).subscribe(
      (response:any)=>{
        this.snackBar.open(response.statusMessage, "", {duration:5000});
      }
    )
  }
}
