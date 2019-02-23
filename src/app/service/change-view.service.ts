import { Injectable } from '@angular/core';
import { ViewDto } from '../model/view.model';

@Injectable({
  providedIn: 'root'
})
export class ChangeViewService {
  private viewStyle:string;
  private viewClass:string;
  private viewDto:ViewDto;
  constructor() { 
        this.viewStyle="row wrap";
        this.viewClass  ="noteGrid";
  }

  changeView(viewFlag:boolean)
  {
      if(!viewFlag)
      {
        this.viewStyle="row wrap";
        this.viewClass  ="noteGrid";
      }
      else
      {
        this.viewStyle="column wrap";
        this.viewClass="noteList";
      }
  }

  getCurrentView():ViewDto
  {
    this.viewDto.viewStyle=this.viewStyle;
    this.viewDto.viewClass=this.viewClass;
    return this.viewDto;
  }
}
