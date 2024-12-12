import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(private router : Router) {}

    estado!: boolean

    ngOnInit () {
        if (sessionStorage.getItem('token')) {
            this.estado = true
        } else {
            this.estado = false
        }
    }

    ngDoCheck() {
        this.ngOnInit()
        console.log("docheck");

    }

    logout() {
        sessionStorage.removeItem('token')
        this.router.navigate(['login'])
        this. ngOnInit ()
    }
}
