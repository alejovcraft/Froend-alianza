import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // REVISIÓN CLAVE: ¿Existe el token que guardamos en el login?
  const token = localStorage.getItem('token_alianza');

  if (token) {
    // Si hay token, el guardia da el paso libre
    return true;
  } else {
    // Si NO hay token, el guardia te saca del dashboard
    console.error('Acceso denegado: No se encontró token');
    router.navigate(['/login']);
    return false;
  }
};