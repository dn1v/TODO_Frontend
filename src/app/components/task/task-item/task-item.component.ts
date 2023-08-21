import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

    @Input() task: Task = new Task()

    @Output() taskUpdated: EventEmitter<void> = new EventEmitter()

    @Output() taskEdit: EventEmitter<string> = new EventEmitter<string>()

    constructor(private service: TaskService) { }

    ngOnInit(): void {

    }

    onDone(): void {

       // udpatedTask.done = !udpatedTask.done
        this.service.updateTask(this.task.taskId, { done: !this.task.done }).subscribe({
            next: (task: any) => {
                this.taskUpdated.emit()

            },
            error: (err: any) => {
                console.log(err)
            }
        })
    }

    onDelete(): void {
        this.service.deleteTask(this.task.taskId).subscribe({
            next: (deleted: any) => {
                this.taskUpdated.emit()
            },
            error: (err: any) => {
                console.log(err)
            }
        })
    }

    onEdit(): void {
        this.taskEdit.emit(this.task.taskId)
    }
}
