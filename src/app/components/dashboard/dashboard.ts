import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Para el botón de Cerrar Sesión
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit { // El nombre de la clase debe ser Dashboard según tu carpeta
  nombreUsuarioLogeado: string = 'Admin';
  anioActual: number = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Leemos el nombre que guardó el login.ts en el "bolsillo" del navegador
    const nombre = localStorage.getItem('usuario_alianza');
    if (nombre) {
      this.nombreUsuarioLogeado = nombre;
    }

    // Seguridad extra: Si alguien intenta entrar a /dashboard sin ser admin
    const rol = localStorage.getItem('rol_alianza');
    if (rol !== 'ROLE_ADMIN') {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    // Vaciamos el localStorage como hace un buen sistema de seguridad
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }
}