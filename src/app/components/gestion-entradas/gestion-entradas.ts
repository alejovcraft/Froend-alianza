import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EntradaService } from '../../services/entrada';

@Component({
  selector: 'app-gestion-entradas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-entradas.html',
  styleUrls: ['./gestion-entradas.css']
})
export class GestionEntradas implements OnInit {
  
  listaPartidos: any[] = [];

 constructor(
    private entradaService: EntradaService,
    private cdr: ChangeDetectorRef // <-- ¡Aquí está el despertador!
  ) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.entradaService.obtenerEntradasDisponibles().subscribe({
      next: (datos) => {
        console.log("¡Llegaron los datos a Gestión!", datos);
        this.listaPartidos = datos;
        
        // 👇 ¡EL PELLIZCO PARA QUE ANGULAR DIBUJE LA TABLA! 👇
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error("Error al cargar la tabla", err)
    });
  }

  borrarPartido(id: string) {
    if(confirm("¿Estás 100% seguro de borrar este partido?")) {
      this.entradaService.eliminarEntrada(id).subscribe({
        next: (res) => {
          alert("✅ " + res.mensaje);
          this.cargarTabla(); // Recargamos la tabla para que desaparezca la fila
        },
        error: (err) => {
          alert("❌ Error: " + (err.error?.error || "No se pudo borrar"));
        }
      });
    }
  }
}