import { NgModule} from '@angular/core';
import { LoginComponent } from '../component/login/login.component';
import { RegisterComponent } from '../component/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from '../component/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../component/reset-password/reset-password.component';
import { MatFormFieldModule } from '@angular/material';
import { LoginVerifyComponent } from '../component/verification/login-verify/login-verify.component';
import { ForgetVerifyComponent } from '../component/verification/forget-verify/forget-verify.component';
import { HomeComponent } from '../component/home/home.component';
import { NotesComponent } from '../component/notes/notes.component';
import { ArchiveNotesComponent } from '../component/archive-notes/archive-notes.component';
import { BinComponent } from '../component/bin/bin.component';
import { LabeledNoteComponent } from '../component/labeled-note/labeled-note.component';
import { AuthGuard } from '../service/auth-service.service';

const routes: Routes=[
  {
    path : 'login',
    component: LoginComponent
  }, 
  {
    path : 'register',
    component: RegisterComponent
  },
  {
    path : 'forgetPassword',
    component: ForgetPasswordComponent
  },
  {
    path : 'loginVerify/:token',
    component:LoginVerifyComponent
  },
  {
    path: 'forgetVerify/:token',
    component: ForgetVerifyComponent
  },
  {
    path: 'resetPassword/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'',
        redirectTo:'notes',
        pathMatch: 'full'
      },
      {
        path:'notes',
        component:NotesComponent
      },
      {
        path:'archive',
        component:ArchiveNotesComponent
      },
      {
        path:'bin',
        component:BinComponent

      },
      {
        path:'labels/:labelValue',
        component:LabeledNoteComponent,
        runGuardsAndResolvers:"always"
      }
    ]

  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];
@NgModule({

  imports: [
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}),
    MatFormFieldModule
  ],
  exports:[RouterModule, MatFormFieldModule],
  declarations: [

  ]
})
export class AppRoutingModule { }
