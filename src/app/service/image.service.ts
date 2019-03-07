import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const httpOptions = 
              {headers: new HttpHeaders({
                                        "jwt_token":localStorage.getItem("token")})};
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl= "http://localhost:8084/api/user/";

  constructor(private http:HttpClient) { }

  upload(file:File) {
      let formData = new FormData(); 
      formData.append("file", file); 
     return this.http.post(this.apiUrl+"upload", formData, httpOptions);
    }   
  
}
