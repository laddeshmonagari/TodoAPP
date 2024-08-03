import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/Task';
import { TaskRecord } from '../models/TaskRecord';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ApiService{
  dataReload = new BehaviorSubject<boolean>(false);

  getAll(): Observable<Task []> {
    return this.get<Task []>("/Task");
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.get<Task[]>("/Task?isCompleted=true");
  }

  getActiveTasks(): Observable<Task[]> {
    return this.get<Task[]>("/Task?isCompleted=false");
  }

  getTodaysTasks(): Observable<Task[]> {
    return this.get<Task[]>("/Task/GetTodaysTasks");
  }

  create(task: TaskRecord): Observable<TaskRecord> {
    return this.post<TaskRecord>("/Task",task);
  }

  update(task: TaskRecord): Observable<any> {
    const changedStatus = new TaskRecord(task.id, task.title, task.description, task.dueDate, !task.isCompleted);
    return this.put<TaskRecord>("/Task",changedStatus);
  }

  remove(id: number): Observable<any> {
    return this.delete(`/Task?taskId=${id}`);
  }

  deleteAll(taskIds: number[]): Observable<any> {
    return this.post("/Task/DeleteAll",taskIds);
  }
  
}
