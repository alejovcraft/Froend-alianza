import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private router: Router) {}

  intentarComprar() {
    // Revisamos si existe el token en el "bolsillo" del navegador
    const token = localStorage.getItem('token_alianza');

    if (token) {
      // Si hay token, lo mandamos a la zona de compra (ejemplo: panel-user)
      this.router.navigate(['/panel-user']);
    } else {
      // Si no está registrado, lo mandamos al login avisándole
      alert('¡Atención Hincha! Debes iniciar sesión para comprar tus entradas.');
      this.router.navigate(['/login']);
    }
  }
}