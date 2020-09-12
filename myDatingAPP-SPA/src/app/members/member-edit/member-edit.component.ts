import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user:User;
photoUrl:string;
@ViewChild('editForm') editForm:NgForm;
@HostListener('window:beforeunload',['$event'])
unloadNotification($event:any)
{
  if(this.editForm.dirty)
    {
      $event.returnValue=true;
    }
}
  constructor(private userService:UserService,private authservice:AuthService,private alertify:AlertifyService) { }

  ngOnInit() {
    this.userService.getUser(this.authservice.decodedtoken.nameid).subscribe(
      res=>{
        this.user=res;
      },
      error=>{
        this.alertify.error('error in getting data');
      }
    );

    this.authservice.currentphotourl.subscribe(photourl=> this.photoUrl = photourl);
  }

  UpdateUser()
  {
    this.userService.updateUser(this.authservice.decodedtoken.nameid,this.user).subscribe(
      res=>{
        this.alertify.success("Updated")
      },
      error=>{
        this.alertify.error(error);
      }
    )
  }
  updatephoto(photoUrl:string)
  {
    this.user.photoUrl=photoUrl;
  }
}
