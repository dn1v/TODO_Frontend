import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

    @Input() _id: string = ''

    form: FormGroup = new FormGroup({
        content: new FormControl('', Validators.required),
        done: new FormControl(false)
    })

    @Output() taskCreated: EventEmitter<void> = new EventEmitter()

    @Output() modalClosed: EventEmitter<void> = new EventEmitter()

    constructor(private serivce: TaskService) { }

    ngOnInit(): void {
        let taskToEdit: Task
        this.serivce.fetchTask(this._id).subscribe({
            next: (task: Task) => {
                taskToEdit = task
                this.form.patchValue(taskToEdit)
            },
            error: (err: any) => console.log(err)
        })
        console.log(this._id)

    }

    get content() {
        return this.form.get('content')
    }

    get done() {
        return this.form.get('done')
    }

    onCreateTask(): void {
        this.serivce.createTask(this.form.value).subscribe({
            next: (data: Task) => {
                console.log(data)
                this.taskCreated.emit()
                this.onClose()
            },
            error: (err: any) => {
                this.taskCreated.emit()
                console.log(err)
                this.onClose()
            }
        })
    }

    onEditTask(): void {
        this.serivce.editTask(this.form.value, this._id).subscribe({
            next: (data: Task) => {
                console.log(data)
                this.taskCreated.emit()
                this.onClose()
            },
            error: (err: any) => {
                this.taskCreated.emit()
                console.log(err)
                this.onClose()
            }
        })
    }

    onClose(): void {
        this.modalClosed.emit()
    }

}
