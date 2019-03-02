import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Label } from '../model/label.model';
import { Observable } from 'rxjs';
import { Note } from '../model/note.model';
import { LabelDto } from '../model/labelDto.model';
import { AllNotes } from '../model/allNotes.model';

const httpOptions = {headers: new HttpHeaders({"Content-Type":"application/json","jwt_token":localStorage.getItem("token")})} ;

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private apiUrl="http://localhost:8888/api/labels/";
  
  constructor(private http:HttpClient) { }

  getLabels():Observable<Label[]>
  {
    return this.http.get<Label[]>(this.apiUrl, httpOptions);
  }
  getLabel(labelValue:String):Observable<Label>
  {
    return this.http.get<Label>(this.apiUrl+"getLabel?labelValue="+labelValue, httpOptions);
  }
  getLabeledNotes(labelValue:String)
  {
    return this.http.get<AllNotes[]>(this.apiUrl+"labeledNotes/"+labelValue, httpOptions);
  }

  updateLabel(label:Label)
  {
    return this.http.put<Response>(this.apiUrl,label, httpOptions);
  }

  createLabel(labelDto:LabelDto)
  {
    return this.http.post<LabelDto>(this.apiUrl, labelDto, httpOptions);
  }

  deleteLabel(labelId:LongRange)
  {
    return this.http.delete(this.apiUrl+"?labelId="+labelId, httpOptions );
  }

}
