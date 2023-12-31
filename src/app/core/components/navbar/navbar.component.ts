import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit(): void { }

    onLogout(): void {
        this.authService.logout()
        this.authService.user.next(null)
    }
}
