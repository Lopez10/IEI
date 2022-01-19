import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  todo: any = {
    localidad: '',
    cp: '',
    provincia: '',
    tipo: '',
  };

  ruta = 'http://localhost:3000/busqueda?';

  constructor(private http: HttpClient) {}

  busquedaForm(): void {
    console.log(this.todo);
  }

  obtenerBusqueda() {
    //TODO: Hacer ruta dinamica con el objeto todo
    // return this.http.get(`ruta+${this.todo.localidad}&cp=${this.todo.cp}`);
  }
}
