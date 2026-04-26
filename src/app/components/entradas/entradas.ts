// 1. Añadimos ChangeDetectorRef en la importación de @angular/core
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EntradaService } from '../../services/entrada'; 

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entradas.html',
  styleUrls: ['./entradas.css'] 
})
export class Entradas implements OnInit {
  listaEntradas: any[] = [];
  nombreUsuario: string | null = '';

  // 2. Inyectamos el cdr (ChangeDetectorRef) en el constructor
  constructor(
    private entradaService: EntradaService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('usuario_alianza');

    this.entradaService.obtenerEntradasDisponibles().subscribe({
      next: (datos) => {
        console.log('¡Datos recibidos de Spring Boot!', datos);
        this.listaEntradas = datos;
        
        // 3. ¡EL PELLIZCO MÁGICO! Forzamos a Angular a redibujar la pantalla al instante
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al traer las entradas', err);
      }
    });
  }
}