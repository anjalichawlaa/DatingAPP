import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import {AuthService} from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Register/Register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { approutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import {JwtModule} from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthGuard } from './authguard/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsaved } from './authguard/prevent-unsaved.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

export function tokengetter()
{
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [								
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MemberListComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(approutes),
    JwtModule.forRoot(
      {
        config:{
          tokenGetter: tokengetter,
          allowedDomains: ['localhost:5000'],
          disallowedRoutes: ['localhost:5000/Auth']
        }
      }
    ),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
  ],
  providers: [AuthService,ErrorInterceptorProvider,AuthGuard,AlertifyService,UserService,
    MemberDetailResolver,PreventUnsaved],
  bootstrap: [AppComponent]
})
export class AppModule { }
