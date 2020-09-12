import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../_models/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
user:User;
registerForm:FormGroup;
@Output() cancelRegister=new EventEmitter();
  constructor(private auth:AuthService, private alertify:AlertifyService,
    private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
  this.createRegisterForm();
  }
passwordmatchvalidator(g:FormGroup)
{
  return g.get('password').value === g.get('confirmpassword').value ? null :{'mismatch':true};
}
  register()
  {
    if(this.registerForm.valid)
    {
      this.user=Object.assign({},this.registerForm.value);
      this.auth.register(this.user).subscribe(()=>{
        this.alertify.success("successfuly")
      },
      error=>{
        this.alertify.error(error);
      },
      ()=>{
        this.auth.login(this.user).subscribe(()=>{
          this.router.navigate(['/members']);
        })
      });
    }

    console.log(this.registerForm.value);

   }
   cancel()
   {
     this.cancelRegister.emit(false);
     this.alertify.message('cancelled');
   }

   createRegisterForm()
   {
     this.registerForm = this.fb.group(
       {
         gender:['male'],
         username:['',Validators.required],
         knownAs:['',Validators.required],
         dateOfBirth:[null,Validators.required],
         city:['',Validators.required],
         country:['',Validators.required],
         password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
         confirmpassword:['',[Validators.required]]
       },
       {validator:this.passwordmatchvalidator}
     );
   }
}

