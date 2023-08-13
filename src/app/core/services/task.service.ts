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

    updateTask(_id: string, obj: any) {
        return this.http.patch(`${this.BASE_URL}/${_id}`, obj)
    }

    deleteTask(_id: string) {
        return this.http.delete(`${this.BASE_URL}/${_id}`)
    }

    handleError(err: HttpErrorResponse) {
        const errorMessage = errorMessages[err.status] || errorMessages['unknownError']
        return throwError(() => new Error(errorMessage))
    }


}
