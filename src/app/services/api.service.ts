import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from './../../types';
import { ITodo } from '../../../../server/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  get<T>(url: string, options: Options): Observable<T> {
    return this.HttpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, body: {task: string, dateDue: string, dateCreated?: string}, options: Options): Observable<T> {
    return this.HttpClient.post<T>(url, body, options) as Observable<T>;
  }

  put<T>(url: string, body: ITodo, options: Options): Observable<T> {
    return this.HttpClient.put<T>(url, body, options) as Observable<T>;
  }

  patch<T>(url: string, body: ITodo, options: Options): Observable<T> {
    return this.HttpClient.patch<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.HttpClient.delete<T>(url, options) as Observable<T>;
  }
}