import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { User } from '../model/user.model';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';
import { UserInfo } from '../model/userInfo.model';
import { Observable } from 'rxjs';
import { CollabUserInfo } from '../model/collabUser.model';

const httpOptions= {headers: new HttpHeaders({'Content-type':'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router:Router) { }
  private apiUrl= "http://localhost:8084/api/user/";
  login:Login;
  
  registerUser(user:User):any
  {
    return this.http.post<User>(this.apiUrl, user,
                                {observe:'response'});
  }

  loginUser(login:Login):any
  {
    this.login=login;
    localStorage.setItem("userName", login.userName+"");

    return this.http.post<Login>(this.apiUrl+"login", login,
                                {headers:new HttpHeaders().set("jwt_token",""), observe:'response'});
  }

  forgetPassword(userName:String):any                 
  {
    return this.http
               .get(this.apiUrl+"forgetPassword?userName="+userName,{headers:new HttpHeaders().set("jwt_token",""), observe:'response'});
  }

  verifyUser(token:String)
  {
    return this.http
        .get(this.apiUrl+"verification/"+token, {headers:new HttpHeaders().set("jwt_token",token+""), observe:'response'});     
  }
  getUser(userName:String)
  {
    return this.http.get<User>(this.apiUrl+userName, httpOptions);
  }

  resetPassword(password:String, password2:String, token:String):any
  {
      return this.http.put(this.apiUrl+"resetPassword/"+token+"/?password="+password, password,
                           {headers:new HttpHeaders().set("jwt_token",""+token), observe:'response'});
  }

  collabDetails(userIds:LongRange[]):Observable<UserInfo[]>
  {
    return this.http.post<UserInfo[]>(this.apiUrl+"details", userIds, httpOptions);
  }

  getUserBtEmailId(emailId:string)
  {
    return this.http.get<LongRange>(this.apiUrl+"email/"+emailId, httpOptions);

  }

  getUserDetails()
  {
    return this.http.get<CollabUserInfo[]>(this.apiUrl+"/alluser/details", httpOptions);
  }
}
