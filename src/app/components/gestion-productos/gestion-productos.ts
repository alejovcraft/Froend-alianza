import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';   


@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-productos.html',
  styleUrls: ['./gestion-productos.css']
})
export class GestionProductos {

  // LISTA DE PRODUCTOS
  listaProductos: any[] = [
   
  ];
  modoEdicion: boolean = false;

  // MOSTRAR / OCULTAR FORMULARIO
  mostrarFormulario: boolean = false;
constructor(private productoService: ProductoService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        console.log("Productos obtenidos:", data);  
        this.listaProductos = data;
        this.cdr.detectChanges()

      },
      error: (err) => console.error("Error al traer productos", err)
    });
  }

  // OBJETO NUEVO PRODUCTO
  nuevoProducto = {
    id_producto: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: ''
  };

  // ABRIR FORMULARIO
  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  // CERRAR FORMULARIO
  cerrarFormulario() {
    this.mostrarFormulario = false;

    this.nuevoProducto = {
      id_producto: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: ''
    };
  }
guardarProducto() {

  if (this.modoEdicion && this.nuevoProducto.id_producto) {

    this.productoService.actualizarProducto(
      this.nuevoProducto.id_producto,
      this.nuevoProducto
    ).subscribe({

      next: (res) => {
        console.log("Producto actualizado:", res);

        this.listarProductos();
        this.cerrarFormulario();
      },

      error: (err) => {
        console.error("Error al actualizar:", err);
      }

    });

  } else {

    this.productoService.crearProducto(this.nuevoProducto).subscribe({

      next: (res) => {
        console.log("Producto creado:", res);

        this.listarProductos();
        this.cerrarFormulario();
      },

      error: (err) => {
        console.error("Error al crear:", err);
      }

    });

  }
}
// MÉTODO EDITAR PRODUCTO

editarProducto(producto: any) {

  this.mostrarFormulario = true;
  this.modoEdicion = true; // 🔥 IMPORTANTE

  this.nuevoProducto = {
    id_producto: producto.id_producto,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
    imagen: producto.imagen
  };
}
  eliminarProducto(id: string) {
  this.productoService.eliminarProducto(id).subscribe({
    next: () => {
      this.listarProductos(); // refresca desde backend
    },
    error: (err) => {
      console.error("Error al eliminar:", err);
    }
  });
}
}