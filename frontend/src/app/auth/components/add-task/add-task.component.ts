import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { NgToastService } from 'ng-angular-popup';
import { TaskRecord } from '../../models/TaskRecord';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() task!:Task;
  @Output() closeModal = new EventEmitter<void>();
  isEditMode: boolean = false;
  taskForm!: FormGroup;
  taskDeatils!: Task;
  
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id:[0],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [new Date()],
      isCompleted: [false, Validators.required]
    });

    if(this.task!=null){
      this.isEditMode=true;
      this.taskForm.controls['title'].setValue(this.task.title);
      this.taskForm.controls['description'].setValue(this.task.description);
      const formattedDueDate = new Date(this.task.dueDate).toISOString().split('T')[0];
      this.taskForm.controls['dueDate'].setValue(formattedDueDate);
      this.taskForm.controls['isCompleted'].setValue(this.task.isCompleted);
    }
    
  }

  onTaskSubmit(): void {
    if (this.isEditMode) {
      const formValue = this.taskForm.value;
      this.taskService.update(new TaskRecord(this.task.id, formValue.title, formValue.description, formValue.dueDate, formValue.isCompleted)).subscribe({
        next: () => {
          this.toast.success("Updated task successfully", "SUCCESS", 5000);
          this.taskService.dataReload.next(true);
        },
        error: () => {
          this.toast.danger("Failed to update task. Please try again later.","ERROR",5000);
        }
      });
    } 
    else {
      const formValue = this.taskForm.value;
      this.taskService.create(new TaskRecord(formValue.id,formValue.title, formValue.description, formValue.dueDate,formValue.isCompleted)).subscribe({
        next: () => {
          this.toast.success("Task added successfully", "SUCCESS", 5000);
          this.close();
        },
        error: () => {
          this.toast.danger("Failed to add task. Please try again later..","ERROR",5000);
        }
      });
    }
  }
  
  close(): void {
     this.closeModal.emit();
  }
  
}
