//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterModule } from '@angular/router';
import { JsonPipe, CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './gestion-usuarios.html',
  styleUrls: ['./gestion-usuarios.css']
})

export class GestionUsuarios implements OnInit {
  listaUsuarios: any[] = [];
  nombreUsuarioLogeado: string = 'Admin';
  anioActual: number = new Date().getFullYear();

  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  // Inyectarlo en el constructor
  constructor(
    private usuariosService: UsuariosService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        this.cd.detectChanges(); 
      }
    });
  }

  guardarCambios(usuario: any) {
   console.log('Enviando actualización para:', usuario.username);

    this.usuariosService.actualizarUsuario(usuario).subscribe({
      next: () => {
        this.Toast.fire({
          icon: 'success',
          title: `¡Usuario ${usuario.username} actualizado!`,
          background: '#f8f9fa',
          color: '#002D56'
        });
    },
    error: (err) => {
        console.error(err);
        this.Toast.fire({
          icon: 'error',
          title: 'Error al actualizar los datos',
          background: '#fff0f0'
        });
      }
  });
  }

  cerrarSesion() {
    
    this.router.navigate(['/login']);
  }
}