import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    userService = inject(UserService)
    formEdit!: FormGroup
    urlVideo = "/public/Manchester.mp4"
    constructor(private fb : FormBuilder, private router : Router) {
        this.formEdit = this.fb.group({
            email:['', []],
            apellido:['', []],
            nombre:['', []],
            imagen:['', []]
        })
    }

    usuarios!: any

    ngOnInit () {
        if (sessionStorage.getItem('token') == undefined || null) {
            this.router.navigate(['login'])
        }

        this.userService.getUsers().subscribe({
            next:(resApi : any)=> {
                console.log(resApi);
                this.usuarios = resApi
            },
            error:(error: any)=>{

            }
        })
    }

    eliminar (id: string) {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                this.userService.eliminarUser(id).subscribe({
                    next:(resApi:any)=> {
                        this.ngOnInit()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    },
                    error:(error:any)=>{
                        console.log(error);

                    }
                })

            }
          });


    }

    update(id:string) {
        this.userService.updateUser(id, this.formEdit.value).subscribe({
            next:(resApi: any)=>{
                alert("editado")
            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }

    getUser (id: string) {
        this.userService.getOneUSer(id).subscribe({
            next:(resApi: any)=>{
                console.log("usr obtenido");
                this.formEdit.setValue({
                    email:resApi.email,
                    apellido:resApi.apellido,
                    nombre:resApi.nombre,
                    imagen:resApi.imagen
                })
            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }

}
