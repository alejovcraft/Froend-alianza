export interface Usuario {
  id_usuario: string;
  username: string;
  estado: number; // 1 o 0
  persona?: {
    email: string;
    nombre_persona: string;
  };
  rol: {
    id_rol: string;
    nombre_rol: string;
  };
}