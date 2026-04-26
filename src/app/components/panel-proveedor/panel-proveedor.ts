import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-proveedor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panel-proveedor.html',
  styleUrls: ['./panel-proveedor.css']
})
export class PanelProveedor implements OnInit {
  
  nombreUsuario: string = 'Cargando...';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 1. Leemos los datos EXACTOS que guardaste en tu Login
    const usuarioGuardado = localStorage.getItem('usuario_alianza');
    const rolGuardado = localStorage.getItem('rol_alianza');

    // 2. Seguridad Front-End: Si no es Proveedor, lo sacamos de aquí
    if (rolGuardado !== 'ROLE_PROVEEDOR') {
      console.warn("Intento de acceso no autorizado. Redirigiendo...");
      this.cerrarSesion();
      return; // Detenemos la ejecución
    }

    // 3. Si todo está en orden, mostramos su nombre en el Navbar
    if (usuarioGuardado) {
      this.nombreUsuario = usuarioGuardado;
    }
  }

  cerrarSesion() {
    // Borramos las variables específicas que creaste en el Login
    localStorage.removeItem('token_alianza');
    localStorage.removeItem('usuario_alianza');
    localStorage.removeItem('rol_alianza');
    
    // Lo mandamos de vuelta al Login
    this.router.navigate(['/login']);
  }
}