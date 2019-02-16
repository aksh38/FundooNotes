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
    children:[
      {
        path:'',
        redirectTo:'notes',
        pathMatch: 'full'
      },
      {
        path:'notes',
        component:NotesComponent
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
    RouterModule.forRoot(routes),
    MatFormFieldModule
  ],
  exports:[RouterModule, MatFormFieldModule],
  declarations: [

  ]
})
export class AppRoutingModule { }
