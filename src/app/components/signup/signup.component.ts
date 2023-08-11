import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthResponse } from 'src/models/authResponse.model';
import { Signup } from 'src/models/signup.interface';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


    spinnerActive: boolean = false

    errorMessage: string = ''

    form: FormGroup = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordCheck })


    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void { }

    passwordCheck(group: AbstractControl): { [key: string]: any } | null {
        const form = group as FormGroup
        return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { notSame: true }
    }

    get firstName() {
        return this.form.get('firstName')
    }

    get lastName() {
        return this.form.get('lastName')
    }

    get email() {
        return this.form.get('email')
    }

    get password() {
        return this.form.get('password')
    }

    get confirmPassword() {
        return this.form.get('confirmPassword')
    }

    onSignup(): void {
        this.spinnerActive = true

        let obj: Signup ={
            firstName: this.form.controls['firstName'].value,
            lastName: this.form.controls['lastName'].value,
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }

        this.authService.signup(obj).subscribe({
            next: (data: AuthResponse | null) => {
                if (data?.token) {
                    console.log(data)
                    this.spinnerActive = false
                    this.router.navigate(['/user'])
                }
            },
            error: (err: any) => {
                this.errorMessage = err.message
                console.log(this.errorMessage)
                this.spinnerActive = false
                this.form.reset()
            }
        })
    }

    onCloseEvent(): void {
        this.errorMessage = ''
    }
}
