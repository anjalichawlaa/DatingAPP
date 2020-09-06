import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseurl="http://localhost:5000/auth/";

constructor(private http : HttpClient) { }

login(model:any)
{
  return this.http.post(this.baseurl + "login", model).
  pipe(map((res:any)=>{
    const user = res;
    if(user)
    {
      localStorage.setItem('token',user.token);
    }
  })
);
}

register(model:any)
{
  return this.http.post(this.baseurl+"register",model);
}

}