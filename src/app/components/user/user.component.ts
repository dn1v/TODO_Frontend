import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthResponse } from 'src/models/authResponse.model';
import { User } from 'src/models/user.model';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    user: User = new User()
    errorMessage: string = ''
    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.user.subscribe({
            next: (data: AuthResponse | null) => {
                if (data?.user) this.user = data.user
            },
            error: (err: any) => {
                this.errorMessage = err
                console.log(this.errorMessage)
            }
        })
    }
}
