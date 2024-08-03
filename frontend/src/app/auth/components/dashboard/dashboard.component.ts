import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  todaysDate: Date = new Date();
  taskList:Task[]=[];
  activeCount:number=0;
  completedCount:number=0;

  constructor(
    private taskService: TaskService,
    private toast:NgToastService
  ) {}

  ngOnInit(): void { 
    this.getTodaysTasks();
    this.taskService.dataReload.subscribe({
      next:(val)=>{
        if(val==true){
          this.getTodaysTasks();
        }
      },
      error:()=>{
        this.toast.danger("Failed to reload data","ERROR",5000);
      }
    })
  }

  private getTodaysTasks() {
    this.taskService.getTodaysTasks().subscribe({
      next: (data) => {
        const activeTasks = data.filter(task => !task.isCompleted);
        const completedTasks = data.filter(task => task.isCompleted);
        this.taskList = [...activeTasks, ...completedTasks];
        this.completedCount=completedTasks.length;
        this.activeCount=activeTasks.length;
      },
      error: () => {
        this.toast.danger("Failed to load todays tasks","ERROR",5000);
      }
    });
  }

  deleteAll(): void {
    const taskIds = this.taskList.map(task => task.id);
    this.taskService.deleteAll(taskIds).subscribe({
      next: () => {
        this.toast.success("Successfully deleted all tasks.","SUCCESS",5000);
        this.getTodaysTasks(); 
      },
      error: () => {
        this.toast.danger("Failed to delete all tasks, Please try again later","ERROR",5000);
      }
    });
  }

}
