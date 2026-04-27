import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // 🔹 Endpoint base (mejor separar rutas)
  private api = 'http://localhost:9090/api/productos';

  constructor(private http: HttpClient) {}

  // 🔹 LISTAR
  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/listar`);
  }

  // 🔹 BUSCAR POR ID
  obtenerProductoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/buscar/${id}`);
  }

  // 🔹 CREAR
  crearProducto(producto: any): Observable<any> {
    return this.http.post(`${this.api}/crear`, producto);
  }

  // 🔹 ACTUALIZAR
  actualizarProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.api}/editar/${id}`, producto);
  }

 eliminarProducto(id: string) {
  return this.http.delete(`${this.api}/eliminar/${id}`);
}
}