import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  photoUrl:string;
  constructor(private auth:AuthService, private alertify:AlertifyService,
    private route:Router) { }

  ngOnInit() {
    this.auth.currentphotourl.subscribe(photourl=>this.photoUrl=photourl);
  }
  login()
  {
   this.auth.login(this.model).subscribe(next=>{
    this.alertify.success('logged in successfully');
   },
   error=>{
    this.alertify.error(error);
   },
   ()=>
   {
     this.route.navigate(['/members']);
   })
    
  }
  loggedIn()
  {
    return this.auth.loggedIn();
  }
logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.auth.decodedtoken=null;
  this.auth.currentuser=null;

  this.alertify.message('logged out');
  this.route.navigate(['/home']);
}
}
