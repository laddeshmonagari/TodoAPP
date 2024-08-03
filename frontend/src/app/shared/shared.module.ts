import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAccountService } from './services/user-account.service';
import { AddModalPopupComponent } from './components/add-modal-popup/add-modal-popup.component';


@NgModule({
  declarations: [
    SideNavbarComponent,
    HeaderComponent,
    AddModalPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports:[
    SideNavbarComponent,
    HeaderComponent
  ],
  providers: [
    UserAccountService
  ]
})
export class SharedModule { }
