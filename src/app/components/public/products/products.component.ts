import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

    products!: any
    productService = inject(ProductsService)
    formProduct!: FormGroup
    formEdit!: FormGroup

    constructor(private fb : FormBuilder){
        this.formProduct = this.fb.group({
            nombre: ['', [Validators.required]],
            precio: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            serie: ['', [Validators.required]],
            imagen: ['', [Validators.required]],
            marca: ['', [Validators.required]]
        })
        this.formEdit = this.fb.group({
            nombre: ['', [Validators.required]],
            precio: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            serie: ['', [Validators.required]],
            imagen: ['', [Validators.required]],
            marca: ['', [Validators.required]]
        })
    }

    ngOnInit () {
        this.productService.getProducts().subscribe({
            next:(resApi: any)=> {
                this.products = resApi
            },
            error:(error:any)=>{
                console.log(error);

            }
        })
    }

    eliminar(id :string) {
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
                this.productService.deleteProduct(id).subscribe({
                    next:(resApi:any)=> {
                        this.ngOnInit()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    },
                    error:(error:any)=> {
                        console.log(error);
                        Swal.fire({
                            title: "Can't delete!",
                            text: `${error.error.error}`,
                            icon: "error"
                          });
                    }
                })

            }
          });


    }

    addProduct () {
        if (this.formProduct.valid) {
            this.productService.createProduct(this.formProduct.value).subscribe({
                next:(resApi:any)=> {
                    this.formProduct.reset()
                    this.ngOnInit()
                    Swal.fire({
                        icon:"success",
                        title:"Creado!",
                        text:"Nuevo producto añadido!"
                    })
                },
                error:(error:any)=> {
                    console.log(error);
                    Swal.fire({
                        icon:"error",
                        title:"No Creado!",
                        text:"No se ha añadido el producto!"
                    })
                }
            })
        } else {
            Swal.fire({
                icon:"error",
                title:"Form Invalido!",
                text:"Diligencie correctamente el formulario"
            })
        }
    }

    updateProduct (id: string) {
        this.productService.getOneProduct(id).subscribe({
            next:(resApi:any)=> {
                console.log(resApi);

                this.formEdit.setValue({
                    nombre: resApi.nombre,
                    precio: resApi.precio,
                    tipo: resApi.tipo,
                    descripcion: resApi.descripcion,
                    serie: resApi.serie,
                    imagen: resApi.imagen,
                    marca:resApi.marca
                })
            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }



}
