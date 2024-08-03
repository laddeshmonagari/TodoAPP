import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginUser } from '../../models/LoginUser';
import { UserAccountService } from '../../../shared/services/user-account.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  isSignInMode: boolean = true;
  
  constructor(
    private userAccountService:UserAccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toast:NgToastService 
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isSignInMode = url[0].path === 'login';
    });
  }

  onSubmit() {
    const userData = new LoginUser(this.userName, this.password);
    if (this.isSignInMode) {
      this.userAccountService.login(userData).subscribe({
        next: (response) => {
          if (response.isSuccessfulLogin) {
            localStorage.setItem('token', response.token);
            this.toast.success("Successfully logged in", "SUCCESS", 5000);
            this.router.navigate(['/auth']);
          } 
          else {
            this.toast.danger("Failed to login. Please enter valid details","ERROR",5000);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toast.danger("Failed to login. Please enter valid details","ERROR",5000);
        }
      });
    } 
    else {
      this.userAccountService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          if (response.isSuccessfull) {
            this.toast.success("Successfully registered", "SUCCESS", 5000);
            this.router.navigate(['auth/login']);  
          } else {
            this.toast.danger("Failed to create user. Please try again later","ERROR",5000);
          }
        },
        error: (err) => {
          console.error('User Creation failed', err);
          this.toast.danger("Failed to create user. Please try again later","ERROR",5000);
        }
      });
    }
  }

  toggleMode() {
    this.isSignInMode = !this.isSignInMode;
    const newRoute = this.isSignInMode ? 'unauth/login' : 'unauth/register';
    this.router.navigate([`/${newRoute}`]);  
  }

  get title(): string {
    return this.isSignInMode ? 'Sign In' : 'Register';
  }

  get subTitle(): string {
    return this.isSignInMode ? "Don't have an account? Create " : "Already have an account? Sign in ";
  }

}
