import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // 1. Buscamos el fotocheck (token) en el bolsillo (localStorage)
    const token = localStorage.getItem('token_alianza');
    
    // 2. Lo preparamos para enviarlo
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // 3. Enviamos la petición CON el token
    return this.http.get<any[]>(`http://localhost:9090/api/ventas/usuario/${username}`, { headers: headers });
  }
}