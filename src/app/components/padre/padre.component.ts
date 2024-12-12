import { Component, inject } from '@angular/core';
import { CardComponent } from '../template/card/card.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.css'
})
export class PadreComponent {

    userService = inject(UserService)
    items!: any
    ngOnInit() {
        this.userService.getUsers().subscribe({
            next:(resApi:any)=> {
                this.items = resApi
            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }

}
