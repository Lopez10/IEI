import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {}

  realizarBusqueda(ruta: string) {
    return this.http.get(ruta);
  }

  enviarCarga(ruta: string, data: any) {
    console.log(ruta);
    return this.http.post(ruta, data);
  }
}
