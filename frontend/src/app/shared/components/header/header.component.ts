import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title="";
  constructor(
    private router:Router,
    private userAccountService:UserAccountService,
    private toast:NgToastService,
  ) {}
    
  signOut() {
    this.userAccountService.signOut().subscribe({
      next: (data) => {
        if (data.message) {
          this.router.navigate(['unauth/login']);
        }
      },
      error:()=>{
        this.toast.danger("An error occurred while signing out.","ERROR",5000);
      }
    });
  }

}
