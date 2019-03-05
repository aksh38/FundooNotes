import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { UserService } from './service/user.service';
import { from } from 'rxjs';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { MaterialModule } from 'src/material-module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { LoginVerifyComponent } from './component/verification/login-verify/login-verify.component';
import { ForgetVerifyComponent } from './component/verification/forget-verify/forget-verify.component';
import { HomeComponent } from './component/home/home.component';
import { NotesComponent } from './component/notes/notes.component';
import { NotesService } from './service/notes.service';
import { CreateDialogComponent } from './component/create-dialog/create-dialog.component';
import { ArchiveNotesComponent } from './component/archive-notes/archive-notes.component';
import { BinComponent } from './component/bin/bin.component';
import { LabeledNoteComponent } from './component/labeled-note/labeled-note.component';
import { LabelService } from './service/label.service';
import { LabelDialogComponent } from './component/label-dialog/label-dialog.component';
import { ChangeViewService } from './service/change-view.service';
import { SingleNoteComponent } from './component/single-note/single-note.component';
import { CollabDialogComponent } from './component/collab-dialog/collab-dialog.component';
import { ImageDialogComponent } from './component/image-dialog/image-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    LoginVerifyComponent,
    ForgetVerifyComponent,
    HomeComponent,
    NotesComponent,
    CreateDialogComponent,
    ArchiveNotesComponent,
    BinComponent,
    LabeledNoteComponent,
    LabelDialogComponent,
    SingleNoteComponent,
    CollabDialogComponent,
    ImageDialogComponent   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgMatSearchBarModule,
    ImageCropperModule
  ],
  entryComponents:
  [
    CreateDialogComponent,
    LabelDialogComponent,
    CollabDialogComponent,
    ImageDialogComponent
  ],
  providers: [
    UserService,
    NotesService,
    LabelService,
    ChangeViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule 
{

  
 }
