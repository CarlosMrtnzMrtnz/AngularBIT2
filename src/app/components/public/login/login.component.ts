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
    constructor(private fb : FormBuilder, private router :Router) {
        this.formLogin = this.fb.group({
            email:['',[Validators.required]],
            password:['', [Validators.required]]
        })
    }

    ngOnInit() {
        if (sessionStorage.getItem('token')) {
            this.router.navigate(['home'])
        }
    }

    login() {
        if (this.formLogin.valid) {
            this.userService.session(this.formLogin.value).subscribe({
                next:(resApi:any)=> {
                    let token = resApi
                    sessionStorage.setItem('token', token)
                    Swal.fire({
                        icon:"success",
                        title:"Bienvenido!",
                        text:`${resApi}`
                    })
                    this.router.navigate(['home'])
                },
                error:(error:any)=>{
                    console.log(error);
                    Swal.fire({
                        icon:"warning",
                        title:"Formulario incorrecto!",
                        text:`${error.error.error}`
                    })
                }

            })

        } else {
            Swal.fire({
                icon:"warning",
                title:"Formulario incorrecto!"
            })
        }


    }


}
