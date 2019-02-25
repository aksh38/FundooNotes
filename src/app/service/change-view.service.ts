import { Injectable } from '@angular/core';
import { ViewDto } from '../model/view.model';
import { BehaviorSubject } from 'rxjs';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class ChangeViewService {
  
  private view=new BehaviorSubject(false);
  currentView= this.view.asObservable();

  private xyz;

  constructor() { 
  }

  changeView()
  {
    this.currentView.subscribe(
      response=>
      this.xyz=response
    )
    this.view.next(!this.xyz);
  }
  
}
