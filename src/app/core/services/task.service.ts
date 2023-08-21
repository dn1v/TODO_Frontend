import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from 'src/models/task.model';
import { errorMessages } from 'src/utils/errorMessages';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly BASE_URL = 'http://localhost:3001/tasks'

    constructor(private authService: AuthService, private http: HttpClient) { }

    fetchTasks(): Observable<Task[]> {
        return this.http.get(this.BASE_URL).pipe(map((data: any) => data && data.tasks && data.tasks.map((task: any) => new Task(task))))
    }

    fetchTask(_id: string): Observable<Task> {
        return this.http.get(`${this.BASE_URL}/${_id}`).pipe(map((data: any) => data && new Task(data)), catchError((err) => this.handleError(err)))
    }

    updateTask(_id: string, obj: any) {
        return this.http.patch(`${this.BASE_URL}/${_id}`, obj).pipe(catchError((err) => this.handleError(err)))
    }

    deleteTask(_id: string) {
        return this.http.delete(`${this.BASE_URL}/${_id}`)
    }

    createTask(obj: any) {
        return this.http.post(`${this.BASE_URL}`, obj).pipe(map((data: any) => data && new Task(data)), catchError((err) => this.handleError(err)))
    }

    editTask(obj: any, _id: string): Observable<Task> {
        return this.http.patch(`${this.BASE_URL}/${_id}`, obj).pipe(map((data: any) => data && new Task(data)), catchError((err) => this.handleError(err)))
    }

    handleError(err: HttpErrorResponse) {
        const errorMessage = errorMessages[err.status] || errorMessages['unknownError']
        return throwError(() => new Error(errorMessage))
    }


}
