import { Injectable } from '@angular/core';
import * as alerify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message:string,OkCallBack:()=>any)
{
  alerify.confirm(message,(e:any)=>{
    if(e)
    {
      OkCallBack();
    }
    else
    {

    }
  });
}

success(message:string)
{
  alerify.success(message);
}

error(message:string)
{
  alerify.error(message);
}
warning(message:string)
{
  alerify.warning(message);
}
message(message:string)
{
  alerify.message(message);
}

}
