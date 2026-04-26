import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { PanelUser } from './components/panel-user/panel-user';
import { Entradas } from './components/entradas/entradas';
import { authGuard } from './guards/auth-guard';
import { PanelProveedor } from './components/panel-proveedor/panel-proveedor';
import { Registro } from './components/registro/registro';

// ¡NUEVO! Importamos el componente de compra
import { Compra } from './components/compra/compra'; 

export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'login', component: Login },
  { path: 'registro', component: Registro }, 
  { path: 'entradas', component: Entradas },

  // ¡LA RUTA DE COMPRA AHORA ES REAL Y ESTÁ PROTEGIDA!
  { 
    path: 'comprar/:id', 
    component: Compra, 
    canActivate: [authGuard] 
  },
  
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'panel-user', component: PanelUser, canActivate: [authGuard] },
  { path: 'panel-proveedor', component: PanelProveedor, canActivate: [authGuard] }
];