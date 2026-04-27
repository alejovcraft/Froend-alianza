import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  
  nombreUsuario: string | null = '';
  rolUsuario: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Leemos quién es y qué cargo tiene
    this.nombreUsuario = localStorage.getItem('usuario_alianza');
    this.rolUsuario = localStorage.getItem('rol_alianza');
  }

  cerrarSesion() {
    localStorage.removeItem('token_alianza');
    localStorage.removeItem('usuario_alianza');
    localStorage.removeItem('rol_alianza');
    this.router.navigate(['/login']);
  }
}