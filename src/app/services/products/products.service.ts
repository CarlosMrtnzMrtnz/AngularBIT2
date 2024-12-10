import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    apiUrl: string = "http://localhost:3000/api"

  constructor(private http : HttpClient) { }

    getProducts () {
        return this.http.get(`${this.apiUrl}/products`)
    }

    deleteProduct (id: string) {
        return this.http.delete(`${this.apiUrl}/deleteproduct/${id}`)
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
