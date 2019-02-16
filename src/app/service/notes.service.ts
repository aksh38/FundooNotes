import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../model/note.model';
import { Observable } from 'rxjs';
import { NoteDto } from '../model/noteDto.model';
import { GetNoteDto } from '../model/getNotes.model';

const httpOptions = {

  headers: new HttpHeaders({
                "jwt_token":localStorage.getItem("token")}
        )} ;
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl="http://localhost:8888/api/notes/";

  constructor(private http:HttpClient){}

  getNotes(archived:boolean, trashed:boolean, pinned:boolean):Observable<Note[]>
  {
    return this.http.get<Note[]>(this.apiUrl+"?archived="+archived+"&trashed="+trashed+"&pinned="+pinned, httpOptions);
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
    note.archieve=!note.archieve;
    return this.http.put<Note>(this.apiUrl, note, httpOptions);
  }
}
