import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../_services/auth.service';
@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
model:any={};
@Output() cancelRegister=new EventEmitter();
  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  register()
  {
    this.auth.register(this.model).subscribe(()=>{
      console.log("successfuly")
    },
    error=>{
      console.log(error);
    })

   }
   cancel()
   {
     this.cancelRegister.emit(false);
     console.log('cancelled');
   }
}

