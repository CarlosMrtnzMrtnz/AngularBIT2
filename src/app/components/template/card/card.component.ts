import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {


    @Input() rutaImagen!:any
    @Input() rutaNombre!:any
    @Input() rutaEmail!:any
    @Input() rutaId!:any

    eli(id:string) {

    }
}
