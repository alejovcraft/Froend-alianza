import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../components/dashboard/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private apiUrl = 'http://localhost:9090/api/usuarios';

  constructor(private http: HttpClient) {}
  

 getUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.apiUrl);
}

  actualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar`, usuario);
  }
}