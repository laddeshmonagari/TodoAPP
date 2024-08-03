import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [] ;
  todaysDate: Date = new Date();
  dateText: string = "";
  pageTitle: string = "";

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private toast:NgToastService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
    this.taskService.dataReload.subscribe({
      next:(val)=>{
        if(val==true){
         this.initializeComponent();
        }
      },
      error:()=>{
        this.toast.danger("Failed to reload data","ERROR",5000);
      }
    })
  }

  private initializeComponent(): void {
      const type = this.route.snapshot.url[0].path;
      if (type === 'active') {
          this.loadActiveTasks();
          this.pageTitle = 'Active Tasks';
      } else if (type === 'completed') {
          this.loadCompletedTasks();
          this.pageTitle = 'Completed Tasks';
      }
      else if (type === 'all-tasks'){
        this.loadAllTasks();
        this.pageTitle = 'All Tasks';
      }
  }

  private loadActiveTasks(): void {
    this.taskService.getActiveTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: () => {
        this.toast.danger("Failed to load active tasks.", 'ERROR', 5000);
      }
    });
  }

  private loadCompletedTasks(): void {
    this.taskService.getCompletedTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: () => {
        this.toast.danger("Failed to load completed tasks.", 'ERROR', 5000);
      }
    });
  }

  private loadAllTasks(): void {
    this.taskService.getAll().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: () => {
        this.toast.danger("Failed to load completed tasks.", 'ERROR', 5000);
      }
    });
  }

}
