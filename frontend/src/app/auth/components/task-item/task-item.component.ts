import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent {
@Input() taskDetails!:Task;
addTaskComponent:any = AddTaskComponent;
isDetailsHidden=true;
hourDifference!: number;
daysDifference!: number;

constructor(
  private taskService:TaskService,
  private toast:NgToastService,
  private modalService: NgbModal
){}

  ngOnInit(): void {
    this.calculateTimeDifference();
  }

  toggleDetailsView(){
    this.isDetailsHidden=!this.isDetailsHidden;
  }

  toggleTaskStatus(){
    this.taskService.update(this.taskDetails).subscribe({
      next:()=>{
          this.taskService.dataReload.next(true);
      }
    })
  }

  calculateTimeDifference(): void {
    const createdOn = new Date(this.taskDetails.createdOn);
    const now = new Date();
    const diffInMs = now.getTime() - createdOn.getTime();
    this.hourDifference = Math.floor(diffInMs / (1000 * 60 * 60));
    this.daysDifference = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  editForm(){
    const modalRef = this.modalService.open(this.addTaskComponent);
    modalRef.componentInstance.task=this.taskDetails;
    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close(); 
    }
  )}

  delete(id:number){
    this.taskService.remove(id).subscribe({
      next:()=>{
        this.toast.success("Task deleted Successfully","SUCCESS",5000);
        this.taskService.dataReload.next(true);
      },
      error:()=>{
        this.toast.danger("Failed to delete task","ERROR",5000);
      }
    })
  }

}
