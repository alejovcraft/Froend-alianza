import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panel-user.html',
  styleUrls: ['./panel-user.css']
})
export class PanelUser implements OnInit {
  nombreUsuario: string | null = '';

  constructor(private router: Router) {}

  // Esto se ejecuta apenas la pantalla carga
  ngOnInit() {
    // Sacamos el nombre del "bolsillo" del navegador para saludarlo
    this.nombreUsuario = localStorage.getItem('usuario_alianza');
  }

  cerrarSesion() {
    // 1. Vaciamos el bolsillo (borramos el token y los datos)
    localStorage.clear();
    // 2. Lo mandamos de regreso al login
    this.router.navigate(['/login']);
  }
}