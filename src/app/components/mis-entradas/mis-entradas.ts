import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta';
import { Navbar } from '../navbar/navbar'; 
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-mis-entradas',
  standalone: true,
  imports: [CommonModule, Navbar, RouterModule], 
  templateUrl: './mis-entradas.html',
  styleUrls: ['./mis-entradas.css']
})
export class MisEntradas implements OnInit {
  compras: any[] = [];
  cargando: boolean = true;

  constructor(
    private ventaService: VentaService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario_alianza');
    if (usuario) {
      this.ventaService.obtenerMisEntradas(usuario).subscribe({
        next: (data) => {
          console.log("¡Datos recibidos!", data);
          this.compras = data || []; 
          this.cargando = false;
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error("Error:", err);
          this.cargando = false;
        }
      });
    } else {
      this.cargando = false;
    }
  }

  generarPDF(venta: any) {
    const doc = new jsPDF();
    
    // 1. SOLUCIÓN AL SYNTAX ERROR: 
    // Obtenemos el usuario del localStorage. Si falla el parse, usamos el texto directo.
    let nombreComprador = 'Usuario Alianza';
    const storageUser = localStorage.getItem('usuario_alianza');
    try {
        const parsed = JSON.parse(storageUser || '');
        nombreComprador = parsed.nombre || storageUser;
    } catch (e) {
        nombreComprador = storageUser || 'Usuario Alianza'; // Si es solo texto "juan", lo usa aquí
    }

    // 2. BUSCAR AL ASISTENTE (EntradaIndividual -> DuenoEntrada)
    // Prueba con el nombre exacto que ves en tu captura de pantalla
const detalle = venta.ventaEntradas?.[0];
// En lugar de detalle.entradaindividual, ahora es:
const ei = detalle?.entradasIndividuales?.[0]; // Tomamos el primer asistente de la lista
const nombreAsistente = ei?.duenoEntrada?.nombre || 'ASISTENTE';
const dniAsistente = ei?.duenoEntrada?.dni || '---';
    const evento = detalle?.entrada?.evento || 'Alianza Lima vs Universitario';

    // --- DISEÑO DEL PDF ---
    doc.setFillColor(0, 26, 59); 
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('E-TICKET OFICIAL', 105, 25, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('TITULAR DE LA ENTRADA:', 20, 55);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(nombreAsistente.toUpperCase(), 20, 65);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`DNI: ${dniAsistente}`, 20, 72);

    doc.setDrawColor(200);
    doc.line(20, 80, 190, 80);

    doc.setFontSize(10);
    doc.text('DETALLES DEL PARTIDO:', 20, 90);
    doc.setFontSize(16);
    doc.text(evento, 20, 100);

    doc.setFontSize(11);
    doc.text(`Fecha: ${detalle?.entrada?.fecha || '2026-05-02'}`, 20, 110);
    doc.text(`Zona: ${detalle?.entrada?.ubicacion?.idUbicacion || 'Sur'}`, 20, 118);

    // QR / Barras
    doc.setFillColor(0, 0, 0);
    for(let i = 0; i < 40; i++) {
        doc.rect(50 + (i * 2.5), 140, Math.random() * 2, 20, 'F');
    }

    doc.save(`Ticket_${venta.idVenta}.pdf`);
}
}