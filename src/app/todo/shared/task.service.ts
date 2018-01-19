import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { Observable } from 'rxjs/Observable';
import { Task } from './task.model';
import 'rxjs/Rx';

@Injectable()
export class TaskService {
  request$: EventEmitter<any>;
  private tasksUrl: string;
  private headers: HttpHeaders;

  private handleError(error: any) {
    this.request$.emit('finished');
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(private http: HttpClient) {
    this.request$ = new EventEmitter();

    this.tasksUrl = AppConfig.endpoints.tasks;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  getAllTasks(): Observable<Task[]> {
    this.request$.emit('starting');
    return this.http.get(this.tasksUrl)
        .map(response => {
          this.request$.emit('finished');
          return response;
        })
        .catch(error => this.handleError(error));
  }

}
