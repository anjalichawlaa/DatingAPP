import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'myDatingAPP-SPA';
jwthelper= new JwtHelperService();
  constructor(private auth:AuthService)
  {

  }

  ngOnInit()
  {
    const token = localStorage.getItem('token');
    const user :User= JSON.parse(localStorage.getItem('user'));
    this.auth.decodedtoken=this.jwthelper.decodeToken(token);
    this.auth.currentuser = user;
    this.auth.changephoto(user.photoUrl);
  }
}
