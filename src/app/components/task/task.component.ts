import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    tasks: Task[] = []

    taskIdForTaskToEdit: string = ''

    errorMessage: string = ''

    openModal: boolean = false

    spinnerActive: boolean = false

    constructor(private service: TaskService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.getTasks()
    }

    getTasks(): void {
        this.spinnerActive = true
        this.service.fetchTasks().subscribe({
            next: (tasks: Task[]) => {
                this.tasks = tasks
                this.spinnerActive = false
                console.log(this.tasks)
            },
            error: (err: any) => {
                this.errorMessage = err.message
                this.spinnerActive = false
                console.log(this.errorMessage)
            }
        })
    }

    onTaskUpdated(): void {
        this.getTasks()
    }

    onCreateTask(): void {
        let ovj = {}
        this.service.createTask(ovj)
    }

    onModal(): void {
        this.openModal = !this.openModal
    }

    onTaskCreated(): void {
        this.getTasks()
    }

    onEditBtnClick(_id: string): void {
        this.taskIdForTaskToEdit = _id
        console.log('taskId for task to edit:', this.taskIdForTaskToEdit)
        this.openModal = true
    }

}
