import { Component } from '@angular/core';
import { BusquedaService } from '../services/busqueda.service';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

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
    tipo: 'publica',
  };
 
  result: any;

  constructor(private busquedaService: BusquedaService) {}

  busquedaForm(): void {
    this.obtenerBusqueda();
  }

  obtenerBusqueda() {
    let ruta = 'http://localhost:3000/busqueda?';
    //TODO: Hacer ruta dinamica con el objeto todo
    if (this.todo.localidad !== '') {
      ruta += `&localidad=${this.todo.localidad}`;
    }
    if (this.todo.cp !== '') {
      ruta += `&cp=${this.todo.cp}`;
    }
    if (this.todo.provincia !== '') {
      ruta += `&provincia=${this.todo.provincia}`;
    }
    if (this.todo.tipo !== '') {
      ruta += `&tipo=${this.todo.tipo}`;
    }

    this.busquedaService
      .realizarBusqueda(ruta.replace('&', ''))
      .subscribe((data) => {
        console.log(data);
        this.result = data;
      });
  }

  //Mapa
  ngOnInit() {
    (Mapboxgl as any).accessToken = environment.mapboxKey;

    var map = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-3.70256, 40.4165], // starting position [lng, lat]
      zoom: 4 // starting zoom
    })
  }

  
}
