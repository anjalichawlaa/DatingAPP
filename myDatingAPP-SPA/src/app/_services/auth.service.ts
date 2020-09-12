import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import { User } from '../_models/User';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseurl="http://localhost:5000/auth/";
jwthelper = new JwtHelperService();
currentuser:User;
decodedtoken:any;
photourl=new BehaviorSubject('../../assets/user.png');
currentphotourl=this.photourl.asObservable();


changephoto(photoUrl:string)
{
  this.photourl.next(photoUrl);
}
constructor(private http : HttpClient) { }

login(model:any)
{
  return this.http.post(this.baseurl + "login", model).
  pipe(map((res:any)=>{
    const user = res;
    if(user)
    {
      localStorage.setItem('token',user.token);
      localStorage.setItem('user',JSON.stringify(user.userreturn));
      this.decodedtoken = this.jwthelper.decodeToken(user.token);
      this.currentuser=user.userreturn;
      this.changephoto(this.currentuser.photoUrl);
      console.log(this.decodedtoken);
    }
  })
);
}

register(user:User)
{
  return this.http.post(this.baseurl+"register",user);
}
loggedIn()
{
  const token =localStorage.getItem('token');
  return !this.jwthelper.isTokenExpired(token);
}

}
