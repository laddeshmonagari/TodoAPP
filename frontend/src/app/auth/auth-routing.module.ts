import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate:[authGuard],
    children:[
      {
        path: '',
        redirectTo:'dashboard',
        pathMatch: 'full'
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'active',
        component:TaskManagerComponent,
        pathMatch: 'full'
      },
      {
        path:'completed',
        component:TaskManagerComponent,
        pathMatch: 'full'
      },
      {
        path:'all-tasks',
        component:TaskManagerComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
