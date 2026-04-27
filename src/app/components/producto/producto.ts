import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class ProductoComponent implements OnInit {

  // 🛒 PRODUCTOS
  productos: any[] = [];
  productosFiltrados: any[] = [];

  // 🎯 CATEGORÍAS
  categorias = [
    {
      nombre: 'Camisetas',
      tipo: 'polo',
      img: 'https://cdn.joinnus.com/files_alianzalima/2025/landing/categories/category-tshirts.png'
    },
    {
      nombre: 'Souvenirs',
      tipo: 'souvenir',
      img: 'https://cdn.joinnus.com/files_alianzalima/2025/landing/categories/category-souvenirs.png'
    },
    {
      nombre: 'Banderas',
      tipo: 'bandera',
      img: 'https://cdn.joinnus.com/files_alianzalima/2025/landing/categories/category-flags.png'
    }
  ];

  categoriaSeleccionada: string = '';

  // 🎬 BANNER
  imagenes: string[] = [
    '/img/productos/bannerproducto.png' 
  ];

  currentIndex: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {

    // 🔥 CARGAR PRODUCTOS
    this.productoService.obtenerProductos().subscribe(data => {
      console.log(data);
      this.productos = data;
      this.productosFiltrados = data;
    });

    // 🎬 AUTO PLAY
    setInterval(() => {
      this.next();
    }, 4000);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.imagenes.length;
  }

  // 🎯 FILTRAR
  filtrar(categoria: string) {
    this.categoriaSeleccionada = categoria;

    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(categoria)
    );
  }

  mostrarTodos() {
    this.productosFiltrados = this.productos;
    this.categoriaSeleccionada = '';
  }
}