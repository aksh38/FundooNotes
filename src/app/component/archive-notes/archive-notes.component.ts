import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Note } from 'src/app/model/note.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { NoteDto } from 'src/app/model/noteDto.model';
import { Router } from '@angular/router';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';
import { LabelDto } from 'src/app/model/labelDto.model';
import { UpdateNotesService } from 'src/app/service/update-notes.service';
import { ChangeViewService } from 'src/app/service/change-view.service';
import { ViewDto } from 'src/app/model/view.model';

@Component({
  selector: 'app-archive-notes',
  templateUrl: './archive-notes.component.html',
  styleUrls: ['./archive-notes.component.css']
})
export class ArchiveNotesComponent implements OnInit {

  private archivedNotes:Note[];
  private viewDto:ViewDto=new ViewDto();
  constructor(
    private updateService:UpdateNotesService,
    private changeView:ChangeViewService
    ) {
      this.updateService.changeUpdate(true, false).subscribe(
        response=>{
          console.log(response);
          response.forEach(note=> note.archive=true);
        this.archivedNotes=response;
        }
      );

      this.changeView.currentView.subscribe(
        response=>
        this.change(response)
      )
  }

  ngOnInit() {
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
