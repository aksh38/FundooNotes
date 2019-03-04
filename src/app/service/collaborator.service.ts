import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CollaboratorDto } from '../model/collaboratorDto.model';
import { Collaborator } from '../model/collaborator.model';
import { Note } from '../model/note.model';
import { TotalNotes } from '../model/totalNoteDto.model';
import { AllNotes } from '../model/allNotes.model';


const httpOptions = 
              {headers: new HttpHeaders({"Content-Type":"application/json",
                                        "jwt_token":localStorage.getItem("token")})};

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private apiUrl:string= "http://localhost:8888/api/collab/";
  
  constructor(private http:HttpClient) { }

  addCollaborator(collabDto:CollaboratorDto){
    return this.http.post(this.apiUrl, collabDto, httpOptions);
  }

  removeCollaborator(collab:AllNotes)
  {
    return this.http.post<AllNotes>(this.apiUrl+"/remove", collab, httpOptions);
  }
}
