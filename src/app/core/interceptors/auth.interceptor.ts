import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.user.getValue()?.user
        if (!user) return next.handle(req)
        const token = this.authService.user.getValue()?.token
        const modReq = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)})
        return next.handle(modReq)
    }
}