// 1. Agrega ChangeDetectorRef aquí
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { EntradaService } from '../../services/entrada';
import { VentaService } from '../../services/venta'; 

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
    private cdr: ChangeDetectorRef // 2. Inyectamos el despertador de Angular
  ) {}

  ngOnInit(): void {
    const idEntrada = this.route.snapshot.paramMap.get('id');
    
    if (idEntrada) {
      console.log("Buscando el partido con ID:", idEntrada); // Para ver en consola
      
      this.entradaService.obtenerEntradaPorId(idEntrada).subscribe({
        next: (data) => {
          console.log("¡Llegó la data de Spring Boot!", data);
          this.entrada = data;
          this.cdr.detectChanges(); // 3. ¡EL PELLIZCO MÁGICO!
        },
        error: (err) => {
          console.error("Error gigante al buscar la entrada:", err);
          alert("Hubo un error al buscar el partido. Mira la consola (F12).");
        }
      });
    }
  }

  // ... (Tus funciones cambiarCantidad y procesarCompra se quedan exactamente igual) ...

  cambiarCantidad(nuevaCantidad: number) {
    if (nuevaCantidad < 1) nuevaCantidad = 1;
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

  // ¡LA FUNCIÓN FINAL DE COMPRA!
  procesarCompra() {
    // 1. Recuperamos quién está logueado
    const usuarioLogueado = localStorage.getItem('usuario_alianza');

    if (!usuarioLogueado) {
      alert("Error: Sesión expirada. Vuelve a iniciar sesión.");
      this.router.navigate(['/login']);
      return;
    }

    // 2. Armamos el "Paquete DTO" exacto que pide Spring Boot
    const paqueteCompra = {
      idEntrada: this.entrada.idEntrada,
      username: usuarioLogueado,
      cantidad: this.cantidadSeleccionada,
      asistentes: this.listaDuenos // Como los (ngModel) del HTML se llaman igual que el DTO, encajan perfecto
    };

    console.log("Enviando a Spring Boot...", paqueteCompra);

    // 3. Enviamos el paquete usando el servicio
    this.ventaService.realizarCompra(paqueteCompra).subscribe({
      next: (respuesta) => {
        // ¡Si todo sale bien, mostramos el mensaje de éxito y lo mandamos al panel!
        alert("🎉 " + respuesta.mensaje);
        this.router.navigate(['/panel-user']); 
      },
      error: (err) => {
        // Si hay error en el backend (ej. stock agotado o error SQL)
        console.error("Error del servidor:", err);
        alert("❌ Ocurrió un error: " + (err.error?.mensaje || "Revisa la consola"));
      }
    });
  }
}