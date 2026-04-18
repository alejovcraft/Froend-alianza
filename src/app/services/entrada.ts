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
}