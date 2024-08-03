import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskStatusComponent } from './components/task-status/task-status.component';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';

@NgModule({
  declarations: [
    HomeComponent,
    TaskItemComponent,
    TaskStatusComponent,
    AddTaskComponent,
    DashboardComponent,
    TaskManagerComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
