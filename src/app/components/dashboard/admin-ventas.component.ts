import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

// Registramos los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-admin-ventas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-ventas.component.html',
  styleUrls: ['./admin-ventas.component.css']
})
export class AdminVentasComponent implements OnInit, AfterViewInit {
  
  nombreUsuarioLogeado: string = 'admin_alianza';

  // KPIs (Indicadores Clave) Simulados
  totalRecaudado: number = 145250.00;
  entradasVendidas: number = 3250;
  productosVendidos: number = 412;

  @ViewChild('chartVentasMensuales') chartVentasMensuales!: ElementRef;
  @ViewChild('chartCategorias') chartCategorias!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderizarGraficoMensual();
    this.renderizarGraficoCategorias();
  }

  renderizarGraficoMensual() {
    new Chart(this.chartVentasMensuales.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Ingresos Totales (S/)',
          data: [15000, 22000, 18000, 45000, 30000, 15250],
          backgroundColor: '#002244', // Azul Alianza
          borderColor: '#B8A26A', // Dorado
          borderWidth: 2,
          borderRadius: 5
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  renderizarGraficoCategorias() {
    new Chart(this.chartCategorias.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Taquilla (Entradas)', 'Merchandising (Tienda)'],
        datasets: [{
          data: [110000, 35250],
          backgroundColor: ['#002244', '#B8A26A'],
          hoverOffset: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');
  }
}