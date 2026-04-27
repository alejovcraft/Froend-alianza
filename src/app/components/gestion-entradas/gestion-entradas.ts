import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EntradaService } from '../../services/entrada';

@Component({
  selector: 'app-gestion-entradas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-entradas.html',
  styleUrls: ['./gestion-entradas.css']
})
export class GestionEntradas implements OnInit {
  
  listaPartidos: any[] = [];

  mostrarFormulario: boolean = false;
  esEdicion: boolean = false;
  partidoActual: any = {};  

 constructor(
    private entradaService: EntradaService,
    private cdr: ChangeDetectorRef // <-- ¡Aquí está el despertador!
  ) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  abrirNuevoPartido() {
    this.esEdicion = false;
    this.partidoActual = { 
      evento: '', 
      fecha: '', 
      precio: 0, 
      cantidadDisponible: 0,
      // IMPORTANTE: Inicializar el objeto para que el [(ngModel)] tenga donde escribir
      ubicacion: { idUbicacion: 'Sur' } 
    };
    this.mostrarFormulario = true;
  }

  abrirEditar(partido: any) {
    this.esEdicion = true;
    // Si por alguna razón el partido de la base de datos no tiene ubicación, se la creamos
    this.partidoActual = { 
      ...partido, 
      ubicacion: partido.ubicacion ? { ...partido.ubicacion } : { idUbicacion: 'Sur' } 
    };
    this.mostrarFormulario = true;
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
  }

  guardarPartido() {
    if (this.esEdicion) {
      // Editar
      this.entradaService.actualizarEntrada(this.partidoActual.idEntrada, this.partidoActual).subscribe({
        next: (res) => { alert("✅ " + res.mensaje); this.finalizarGuardado(); },
        error: (err) => alert("❌ Error al editar")
      });
    } else {
      // Crear Nuevo
      this.entradaService.crearEntrada(this.partidoActual).subscribe({
        next: (res) => { alert("🎉 " + res.mensaje); this.finalizarGuardado(); },
        error: (err) => alert("❌ Error al crear")
      });
    }
  }

  finalizarGuardado() {
    this.mostrarFormulario = false;
    this.cargarTabla(); // Recargamos para ver los cambios
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