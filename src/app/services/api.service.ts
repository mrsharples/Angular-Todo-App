import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from './../../types';
import { IHttpResponse, ITodo } from '../../../../server/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  get<T>(url: string, options: Options): Observable<IHttpResponse> {
    return this.HttpClient.get<T>(url, options) as Observable<IHttpResponse>;
  }

  post<T>(url: string, body: {task: string, dateDue: string, dateCreated?: string}, options: Options): Observable<IHttpResponse> {
    return this.HttpClient.post<T>(url, body, options) as Observable<IHttpResponse>;
  }

  put<T>(url: string, body: ITodo, options: Options): Observable<IHttpResponse> {
    return this.HttpClient.put<T>(url, body, options) as Observable<IHttpResponse>;
  }

  patch<T>(url: string, body: ITodo, options: Options): Observable<IHttpResponse> {
    return this.HttpClient.patch<T>(url, body, options) as Observable<IHttpResponse>;
  }

  delete<T>(url: string, options: Options): Observable<IHttpResponse> {
    return this.HttpClient.delete<T>(url, options) as Observable<IHttpResponse>;
  }
}