import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1. La dirección BASE de tu Spring Boot (Sin el login)
  private URL_BASE = 'http://localhost:9090/api/usuarios';

  // 2. Inyectamos al cartero en el constructor
  constructor(private http: HttpClient) { }

  // 3. Método para INICIAR SESIÓN
  login(usuario: string, clave: string): Observable<any> {
    const body = {
      username: usuario,
      password: clave
    };
    // Le agregamos /login a la ruta base
    return this.http.post(`${this.URL_BASE}/login`, body);
  }

  // 4. Método para REGISTRAR NUEVO USUARIO
  registrarUsuario(datosRegistro: any): Observable<any> {
    // Le agregamos /registro a la ruta base
    return this.http.post(`${this.URL_BASE}/registro`, datosRegistro);
  }
}