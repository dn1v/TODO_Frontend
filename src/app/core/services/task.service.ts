import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly BASE_URL = 'http://localhost:3001/tasks'

    constructor(private authService: AuthService, private http: HttpClient) { }

    fetchTasks(): Observable<Task[]> {
        return this.http.get(this.BASE_URL).pipe(map((data: any) => data && data.tasks && data.tasks.map((task: any) => new Task(task))))
    }
}
