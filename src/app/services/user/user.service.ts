import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    apiUrl: string = "http://localhost:3000/api"

  constructor(private http : HttpClient) { }

    getUsers () {
        return this.http.get(`${this.apiUrl}/users`)
    }

    eliminarUser (id: string) {
        return this.http.delete(`${this.apiUrl}/deleteuser/${id}`)
    }

    addUser (body: any) {
        return this.http.post(`${this.apiUrl}/adduser`, body)
    }

    updateUser (id :string, body:any) {
        return this.http.put(`${this.apiUrl}/updateuser/${id}`, body)
    }

    getOneUSer (id :string) {
        return this.http.get(`${this.apiUrl}/user/${id}`)
    }

    session (body: any) {
        return this.http.post(`${this.apiUrl}/session`, body)
    }

}
