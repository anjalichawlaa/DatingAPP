import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos:Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;
  baseUrl = environment.apiUrl;
  currentMain:Photo;
 

  constructor(private authService:AuthService,private userService:UserService,private alertify:AlertifyService) { 
    
  }

  ngOnInit() {
   this.InitializeFileUploader();
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  InitializeFileUploader()
  {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Users/' + this.authService.decodedtoken.nameid + '/Photos',
      authToken:'Bearer ' + localStorage.getItem('token'),
      isHTML5:true,
      removeAfterUpload:true,
      allowedFileType:['image'],
      maxFileSize: 10 * 1024 * 1024});

      this.uploader.onAfterAddingFile = (file)=>{file.withCredentials=false;};

      this.uploader.onSuccessItem =(item,response,status,headers) =>
      {
        if(response)
        {
          const res:Photo  = JSON.parse(response);
          const photo = {
            id:res.id,
            url:res.url,
            dateAdded:res.dateAdded,
            description:res.description,
            isMain:res.isMain
          };
          
          this.photos.push(photo);
          if(photo.isMain)
          {
            this.authService.changephoto(photo.url);
            this.authService.currentuser.photoUrl=photo.url;
            localStorage.setItem('user',JSON.stringify(this.authService.currentuser));
          }
          
        }
      }
  }

  setMain(photo:Photo){
    this.userService.setMain(photo.id,this.authService.decodedtoken.nameid).
    subscribe(()=>{
      this.alertify.success("set as main");
      this.currentMain=this.photos.filter(p=>p.isMain===true)[0];
      this.currentMain.isMain=false;
      photo.isMain=true;
      this.getMemberPhotoChange.emit(photo.url);
      this.authService.changephoto(photo.url);
      this.authService.currentuser.photoUrl=photo.url;
      localStorage.setItem('user',JSON.stringify(this.authService.currentuser));
    },
    error=>
    {
      this.alertify.error(error);
    });

  }

  delete(id:number)
  {
    this.alertify.confirm("Are you sure delete",()=>{
      this.userService.deletePhoto(id,this.authService.decodedtoken.nameid).subscribe(()=>{
        this.alertify.success("deleted");
        this.photos.splice(this.photos.findIndex(p=>p.id==id),1);
      },
      error=>
      {
        this.alertify.error(error);
      });
    });
  }
}
