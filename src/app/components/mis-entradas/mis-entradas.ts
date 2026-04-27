import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-mis-entradas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-entradas.html',
  styleUrls: ['./mis-entradas.css']
})
export class MisEntradas implements OnInit {
  compras: any[] = [];
  cargando: boolean = true;

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario_alianza');
    if (usuario) {
      this.ventaService.obtenerMisEntradas(usuario).subscribe({
        next: (data) => {
          this.compras = data;
          this.cargando = false;
        },
        error: () => this.cargando = false
      });
    }
  }

  generarPDF(venta: any) {
    const doc = new jsPDF();
    
    // Diseño del PDF
    doc.setFillColor(0, 26, 59); // Azul Alianza
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('TICKET ELECTRÓNICO - ALIANZA LIMA', 20, 25);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Evento: ${venta.entrada.evento}`, 20, 60);
    doc.text(`Fecha: ${venta.entrada.fecha}`, 20, 75);
    doc.text(`Zona: ${venta.entrada.ubicacion.idUbicacion}`, 20, 90);
    doc.text(`Cantidad: ${venta.cantidad}`, 20, 105);
    doc.text(`Total: S/ ${venta.total}`, 20, 120);
    
    doc.setFontSize(10);
    doc.text('Presenta este PDF en la entrada del Estadio Alejandro Villanueva.', 20, 150);
    
    // Guardar
    doc.save(`Ticket_${venta.entrada.evento}.pdf`);
  }
}