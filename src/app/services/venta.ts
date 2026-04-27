import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  
  // La ruta exacta de tu nuevo VentaController en Spring Boot
  private apiUrl = 'http://localhost:9090/api/ventas';

  constructor(private http: HttpClient) { }

  // Método POST para enviar los datos de la compra
  realizarCompra(datosCompra: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/procesar`, datosCompra);
  }

  obtenerMisEntradas(username: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:9090/api/ventas/usuario/${username}`);
}
}