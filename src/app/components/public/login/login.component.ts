import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    userService = inject(UserService)
    formLogin!: FormGroup
    constructor(private fb : FormBuilder, private router :Router){
        this.formLogin = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        })
    }


    ngOnInit() {
        if (sessionStorage.getItem('token')) {
            this.router.navigate(['home'])
        }
    }

    login () {
        if (this.formLogin.valid) {
            this.userService.session(this.formLogin.value).subscribe({
                next:(resApi:any)=> {
                    let token = resApi

                    sessionStorage.setItem('token', token)
                    Swal.fire({
                        icon:"success",
                        title:"Bienvenido!",
                        text:":D"
                    })
                    this.ngOnInit()
                },
                error:(error:any)=>{
                    console.log(error);
                    Swal.fire({
                    icon:"error",
                    title:"Ups!",
                    text:`${error.error.error}`
            })
                }
            })

        } else {
            Swal.fire({
                icon:"warning",
                title:"Form Incorrecto!",
                text:"Por favor diligencie correctamente el formulario"
            })
        }
    }

}
