import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', Validators.required),
    })

    errorMessage: string = ''

    spinnerActive: boolean = false

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void { }

    get email() {
        return this.form.get('email')
    }

    get password() {
        return this.form.get('password')
    }

    onLogin(): void {
        this.spinnerActive = true

        this.authService.login(this.form.value).subscribe({
            next: (data: any) => {
                if (data?.token) {
                    this.router.navigate(['/user'])
                    this.spinnerActive = false
                }
            },
            error: (err: any) => {
                this.errorMessage = err.message
                this.spinnerActive = false
                this.form.reset()
                console.log(this.errorMessage)
            }
        })
    }

    onCloseEvent() {
        this.errorMessage = ''
    }


}
