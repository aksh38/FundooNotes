import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CollaboratorDto } from '../model/collaboratorDto.model';
import { Collaborator } from '../model/collaborator.model';
import { Note } from '../model/note.model';


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
    return this.http.post<CollaboratorDto>(this.apiUrl, collabDto, httpOptions);
  }

  removeCollaborator(collab:Collaborator)
  {
    return this.http.delete(this.apiUrl+"?collabId="+collab.collaboratorId, httpOptions);
  }

}
