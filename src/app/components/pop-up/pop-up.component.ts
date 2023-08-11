import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

    @Input() message: string = ''
    @Output() closeEvent: EventEmitter<void> = new EventEmitter()

    constructor() {}

    ngOnInit(): void {

    }

    onClick(): void {
        this.closeEvent.emit()
    }
}
