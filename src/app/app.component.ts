import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthResponse } from 'src/models/authResponse.model';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    title = 'TodoApp';

    navBar: boolean = false

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.autoLogin()
        this.authService.user.subscribe({
            next: (data: AuthResponse | null) => {
                if (!data?.token) {
                    this.navBar = false
                    this.router.navigate(['/login'])
                } else {
                    this.navBar = true
                    this.router.navigate(['/user'])
                }
            }
        })
    }
}
