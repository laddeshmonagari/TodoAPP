import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { NgToastService } from 'ng-angular-popup';
import { AddTaskComponent } from '../../../auth/components/add-task/add-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface NavItem {
  event: string;
  navigateUrl: string;
}

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent {  
  @Output() titleEvent = new EventEmitter<string>();
  addTaskComponent:any = AddTaskComponent;

  navItems: NavItem[] = [
    {
      event: 'Dashboard',
      navigateUrl: '/auth/dashboard'
    },
    {
      event: 'Active',
      navigateUrl: '/auth/active'
    },
    {
      event: 'Completed',
      navigateUrl: '/auth/completed'
    },{
      event:'All',
      navigateUrl:'/auth/all-tasks'
    }
  ];
  
  selectedEvent:string = this.navItems[0].event;
  constructor(private router:Router,
    private userAccountService:UserAccountService,
    private toast:NgToastService,
    private modalService: NgbModal
  ){}
  
  
  toggleForm() {
    const modalRef = this.modalService.open(this.addTaskComponent);
    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close(); 
    });
  }

  navigateTo(navigateItem:NavItem) {
    this.selectedEvent = navigateItem.event;
    this.router.navigate([navigateItem.navigateUrl]);
    this.titleEvent.emit(navigateItem.event);
  }

  signOut(){
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
