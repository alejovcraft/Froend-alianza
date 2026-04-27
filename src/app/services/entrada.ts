import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  
  // La ruta de tu Spring Boot
  private apiUrl = 'http://localhost:9090/api/entradas/lista';

  constructor(private http: HttpClient) { }

  obtenerEntradasDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerEntradaPorId(id: string): Observable<any> {
    const urlBusqueda = `http://localhost:9090/api/entradas/buscar/${id}`;
    return this.http.get<any>(urlBusqueda);
  }
  actualizarEntrada(id: string, datosEntrada: any): Observable<any> {
    return this.http.put(`http://localhost:9090/api/entradas/editar/${id}`, datosEntrada);
  }

  // Método para eliminar
  eliminarEntrada(id: string): Observable<any> {
    return this.http.delete(`http://localhost:9090/api/entradas/eliminar/${id}`);
  }
  crearEntrada(datosEntrada: any): Observable<any> {
    return this.http.post(`http://localhost:9090/api/entradas/crear`, datosEntrada);
  }
}