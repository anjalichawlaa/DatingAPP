import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
model:any={};
@Output() cancelRegister=new EventEmitter();
  constructor(private auth:AuthService, private alertify:AlertifyService) { }

  ngOnInit() {
  }

  register()
  {
    this.auth.register(this.model).subscribe(()=>{
      this.alertify.success("successfuly")
    },
    error=>{
      this.alertify.error(error);
    })

   }
   cancel()
   {
     this.cancelRegister.emit(false);
     this.alertify.message('cancelled');
   }
}

