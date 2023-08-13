import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    tasks: Task[] = []

    errorMessage: string = ''

    constructor(private service: TaskService) { }

    ngOnInit(): void {
        this.getTasks()
    }

    getTasks(): void {
        this.service.fetchTasks().subscribe({
            next: (tasks: Task[]) => {
                this.tasks = tasks
                console.log(this.tasks)
            },
            error: (err: any) => {
                this.errorMessage = err.message
                console.log(this.errorMessage)
            }
        })
    }

    onTaskUpdated(): void {
        this.getTasks()
    }

}
