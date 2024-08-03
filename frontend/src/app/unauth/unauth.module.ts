import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthRoutingModule } from './unauth-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UnauthRoutingModule,
    SharedModule
  ]
})
export class UnauthModule { }
