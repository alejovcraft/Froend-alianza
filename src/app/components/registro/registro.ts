import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';

// 1. Importamos tu AuthService real
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {

  datosRegistro = {
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService, // 2. Lo inyectamos aquí
    private router: Router
  ) {}

  procesarRegistro() {
    if (!this.datosRegistro.username || !this.datosRegistro.password || !this.datosRegistro.dni) {
      alert("Por favor, llena los campos obligatorios.");
      return;
    }

    console.log("Enviando datos al servidor...", this.datosRegistro);

    // 3. Usamos tu authService
    this.authService.registrarUsuario(this.datosRegistro).subscribe({
      next: (respuesta) => {
        alert("🎉 " + respuesta.mensaje);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error("Error del servidor:", err);
        alert("❌ Error: " + (err.error?.mensaje || "Ocurrió un problema en el servidor"));
      }
    });
  }
}