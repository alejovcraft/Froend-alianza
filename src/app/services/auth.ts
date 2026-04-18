import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1. La dirección exacta de tu Spring Boot
  private URL_BACKEND = 'http://localhost:9090/api/usuarios/login';

  // 2. Inyectamos al cartero en el constructor
  constructor(private http: HttpClient) { }

  // 3. El método que enviará el JSON al backend
  login(usuario: string, clave: string): Observable<any> {
    // Armamos el "paquete" con los datos, tal cual como en Postman
    const body = {
      username: usuario,
      password: clave
    };

    // Hacemos la petición POST
    return this.http.post(this.URL_BACKEND, body);
  }
}