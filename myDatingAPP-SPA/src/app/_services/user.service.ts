import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';



@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;
currentUser :User;
constructor(private http: HttpClient) { }

getUsers():Observable<User[]>
{
  return this.http.get<User[]>(this.baseUrl+"Users");
}
getUser(id):Observable<User>
{
  return this.http.get<User>(this.baseUrl+"Users/"+id);
}

updateUser(id:number,user:User)
{
  return this.http.put(this.baseUrl+"Users/"+id,user);
}

setMain(id:number,userId:number)
{
  return this.http.post(this.baseUrl + 'Users/' + userId + '/Photos/' + id + '/setMain',{});
}

deletePhoto(id:number,userId:number)
{
  return this.http.delete(this.baseUrl + 'Users/' + userId + '/Photos/' + id);
}
}
