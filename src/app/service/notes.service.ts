import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../model/note.model';
import { Observable } from 'rxjs';
import { NoteDto } from '../model/noteDto.model';
import { Label } from '../model/label.model';


const httpOptions = 
              {headers: new HttpHeaders({"Content-Type":"application/json",
                                        "jwt_token":localStorage.getItem("token")})};

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl="http://localhost:8888/api/notes/";

  constructor(private http:HttpClient){}

  getNotes(archived:boolean, trashed:boolean):Observable<Note[]>
  {
    return this.http.get<Note[]>(this.apiUrl+"?archived="+archived+"&trashed="+trashed, httpOptions);
  }

  updateNote(note:Note)
  {
    return this.http.put<Note>(this.apiUrl, note, httpOptions);
  }
  createNote(noteDto:NoteDto)
  {
    return this.http.post<NoteDto>(this.apiUrl, noteDto, httpOptions);
  }

  archiveNote(note:Note)
  {
    console.log(note.archive);

    return this.http.put<Note>(this.apiUrl+"/archive", note, httpOptions);
  }

  trashNote(note:Note)
  {
    note.trash=!note.trash;
    return this.http.put<Note>(this.apiUrl, note, httpOptions);
  }

  deleteNote(note:Note)
  {
    return this.http.delete<Note>(this.apiUrl+"?noteId="+note.noteId, httpOptions);
  }
  pinNote(note:Note)
  {
    note.pin=!note.pin;
    return this.http.put<Note>(this.apiUrl, note, httpOptions)
  }
  addLabelToNote(labelId:LongRange, noteId:LongRange)
  {
    return this.http.post(this.apiUrl+"addLabel?labelId="+labelId+"&noteId="+noteId, httpOptions);
  }

  removeLabelToNote(labelId:LongRange, noteId:LongRange)
  {
    return this.http.delete<Label>(this.apiUrl+"removeLabels/"+noteId+"/"+labelId, httpOptions);
  }
}
