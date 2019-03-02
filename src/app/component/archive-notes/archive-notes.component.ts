import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { Note } from 'src/app/model/note.model';
import { UpdateNotesService } from 'src/app/service/update-notes.service';
import { ChangeViewService } from 'src/app/service/change-view.service';
import { ViewDto } from 'src/app/model/view.model';
import { AllNotes } from 'src/app/model/allNotes.model';

@Component({
  selector: 'app-archive-notes',
  templateUrl: './archive-notes.component.html',
  styleUrls: ['./archive-notes.component.css']
})
export class ArchiveNotesComponent implements OnInit {

  private archivedNotes=new Array<AllNotes>();
  private viewDto:ViewDto=new ViewDto();
  private allNotes= new Array<AllNotes>();
  constructor(
    private updateService:UpdateNotesService,
    private changeView:ChangeViewService
    ) {}

  ngOnInit() {
    this.updateService.changeUpdate(true, false).subscribe(
      (response)=>{
        this.archivedNotes=response;
      }
    );

    this.changeView.currentView.subscribe(
      response=>
      this.change(response)
    );
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
