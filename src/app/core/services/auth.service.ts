import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, BehaviorSubject, throwError, catchError } from 'rxjs'
import { AuthResponse } from 'src/models/authResponse.model';
import { errorMessages } from 'src/utils/errorMessages';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly BASE_URL = 'http://localhost:3001/users'
    user = new BehaviorSubject<AuthResponse | null>(null)

    constructor(private http: HttpClient, private router: Router) { }

    signup(obj: any): Observable<AuthResponse> {
        return this.http.post(this.BASE_URL, obj).pipe(
            map((data: any) => this.handleAuth(data)),
            catchError((err) => this.handleError(err))
        )
    }

    login(obj?: any): Observable<AuthResponse> {
        return this.http.post(`${this.BASE_URL}/login`, obj).pipe(
            map((data: any) => this.handleAuth(data)),
            catchError((err) => this.handleError(err))
        )
    }

    autoLogin() {
        const data = JSON.parse(localStorage.getItem('userData') || '{}')
        if (data?.token) this.user.next(data)
        else this.user.next(null)
    }

    logout() {
        this.user.next(null)
        this.http.post(`${this.BASE_URL}/login`, {})
        this.router.navigate(['/login'])
        localStorage.removeItem('userData')
    }

    handleError(errRes: HttpErrorResponse) {
        console.log(this.user)
        const errorMessage = errorMessages[errRes.status] || errorMessages['unknownError'];
        return throwError(() => new Error(errorMessage));
    }

    handleAuth(data: any) {
        this.user.next(data)
        localStorage.setItem('userData', JSON.stringify(data))
        return data
    }
}
