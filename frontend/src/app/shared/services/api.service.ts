import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {  }

  get<T>(path:string,options?:Object):Observable<T>{
    return this.httpClient.get<T>(`${this.baseURL}${path}`,options);
  }

  post<T>(path: string, body: any | null, options?: object):Observable<T>{
    return this.httpClient.post<T>(`${this.baseURL}${path}`,body,options);
  }

  put<T>(path: string, body: any | null, options?:object):Observable<T>{
    return this.httpClient.put<T>(`${this.baseURL}${path}`,body,options);
  }
  
  delete<T>(path:string,options?:object):Observable<T>{
    return this.httpClient.delete<T>(`${this.baseURL}${path}`,options)
  }

}
