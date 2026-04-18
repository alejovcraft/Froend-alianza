import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; 
import { Router } from '@angular/router'; // <-- 1. Importamos el "chofer" (Router)

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  mensajeError = '';

  constructor(
    private authService: AuthService,
    private router: Router // <-- 2. Inyectamos al chofer en el constructor
  ) {}

  hacerLogin() {
    this.mensajeError = ''; 

    this.authService.login(this.username, this.password).subscribe({
      next: (respuesta) => {
        // Guardamos los datos
        localStorage.setItem('token_alianza', respuesta.token);
        localStorage.setItem('usuario_alianza', respuesta.username);
        localStorage.setItem('rol_alianza', respuesta.rol);

        // ¡EL CRUCE DE 3 CAMINOS!
        if (respuesta.rol === 'ROLE_ADMIN') {
          console.log('Redirigiendo a Administración');
          this.router.navigate(['/dashboard']);
          
        } else if (respuesta.rol === 'ROLE_PROVEEDOR') { // <-- Agregamos el camino del proveedor
          console.log('Redirigiendo a Logística / Proveedores');
          this.router.navigate(['/panel-proveedor']);
          
        } else {
          console.log('Redirigiendo a Panel de Hincha');
          this.router.navigate(['/panel-user']);
        }
      },
      error: (error) => {
        this.mensajeError = 'Usuario o contraseña incorrectos. Intente nuevamente.';
      }
    });
  }
}