import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    apiUrl: string = "http://localhost:3000/api"
    token:any = sessionStorage.getItem('token')
  constructor(private http : HttpClient) { }

    getProducts () {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        return this.http.get(`${this.apiUrl}/products`, {headers})
    }

    busqueda(nombre:string) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)

        return this.http.get(`${this.apiUrl}/products/${nombre}`, {headers})

    }

    deleteProduct (id: string) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        return this.http.delete(`${this.apiUrl}/deleteproduct/${id}`,{headers})
    }

    createProduct (body: any) {
        return this.http.post(`${this.apiUrl}/addproduct`, body)
    }

    updateProduct (id: string, body:any) {
        return this.http.put(`${this.apiUrl}/updateproduct/${id}`, body)
    }

    getOneProduct (id: string) {
        return this.http.get(`${this.apiUrl}/product/${id}`)
    }
}
