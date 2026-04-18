import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { PanelUser } from './components/panel-user/panel-user';
import { authGuard } from './guards/auth-guard'; // <-- Importamos el guardián

export const routes: Routes = [
  { path: '', component: Home }, // Pública
  { path: 'login', component: Login }, // Pública
  
  // Rutas Protegidas: ¡Aquí ponemos al seguridad!
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [authGuard] 
  },
  { 
    path: 'panel-user', 
    component: PanelUser, 
    canActivate: [authGuard] 
  },
  { 
    path: 'panel-proveedor', 
    component: PanelUser, // Asegúrate de que apunte a su componente
    canActivate: [authGuard] 
  }
];