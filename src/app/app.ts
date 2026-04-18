import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { Login } from './components/login/login'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, /*Login*/], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {  // <-- ¡EL CAMBIO ESTÁ AQUÍ! Solo "App", sin la palabra "Component"
  title = 'alianza-frontend';
}