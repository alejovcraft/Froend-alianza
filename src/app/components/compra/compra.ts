import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { EntradaService } from '../../services/entrada';
import { VentaService } from '../../services/venta'; 

// Declaramos jQuery para el modal
declare var $: any;

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './compra.html',
  styleUrls: ['./compra.css']
})
export class Compra implements OnInit {
  
  entrada: any = null;
  cantidadSeleccionada: number = 1; 
  listaDuenos: any[] = [
    { nombre: '', apellido_p: '', apellido_m: '', dni: '', telefono: '', genero: '' }
  ];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private entradaService: EntradaService,
    private ventaService: VentaService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const idEntrada = this.route.snapshot.paramMap.get('id');
    
    if (idEntrada) {
      console.log("Buscando el partido con ID:", idEntrada); 
      
      this.entradaService.obtenerEntradaPorId(idEntrada).subscribe({
        next: (data) => {
          console.log("¡Llegó la data de Spring Boot!", data);
          this.entrada = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error("Error gigante al buscar la entrada:", err);
          alert("Hubo un error al buscar el partido. Mira la consola (F12).");
        }
      });
    }
  }

  cambiarCantidad(nuevaCantidad: number) {
    if (nuevaCantidad < 1) nuevaCantidad = 1;
    if (nuevaCantidad > 4) nuevaCantidad = 4; 
    if (nuevaCantidad > this.entrada.cantidadDisponible) nuevaCantidad = this.entrada.cantidadDisponible;
    
    this.cantidadSeleccionada = nuevaCantidad;
    const diferencia = this.cantidadSeleccionada - this.listaDuenos.length;

    if (diferencia > 0) {
      for (let i = 0; i < diferencia; i++) {
        this.listaDuenos.push({ nombre: '', apellido_p: '', apellido_m: '', dni: '', telefono: '', genero: '' });
      }
    } else if (diferencia < 0) {
      this.listaDuenos.splice(this.cantidadSeleccionada);
    }
  }

  procesarCompra() {
    const usuarioLogueado = localStorage.getItem('usuario_alianza');
    if (!usuarioLogueado) {
      this.router.navigate(['/login']);
      return;
    }

    const paqueteCompra = {
      idEntrada: this.entrada.idEntrada,
      username: usuarioLogueado,
      cantidad: this.cantidadSeleccionada,
      asistentes: this.listaDuenos
    };

    console.log("Enviando a Spring Boot...", paqueteCompra);

    this.ventaService.realizarCompra(paqueteCompra).subscribe({
      next: (respuesta) => {
        // ABRIMOS EL MODAL
        $('#boletaModal').modal('show'); 
      },
      error: (err) => {
        console.error("Error del servidor:", err);
        alert("❌ Ocurrió un error: " + (err.error?.mensaje || "Revisa la consola"));
      }
    });
  }

  // ESTA ES LA FUNCIÓN QUE FALTABA AISLAR
  irAMisEntradas() {
    $('#boletaModal').modal('hide');
    // Para evitar problemas con el backdrop del modal que a veces se queda pegado
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    
    this.router.navigate(['/panel-user']);
  }
}