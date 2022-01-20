import { Component } from '@angular/core';
import { BusquedaService } from '../services/busqueda.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  provincias: any = [];
  constructor(private busquedaService: BusquedaService) {}

  cargaForm(): void {
    console.log(this.provincias);
    this.busquedaService
      .enviarCarga('http://localhost:3000/provincias', this.provincias)
      .subscribe((data) => console.log(data));
  }
}
