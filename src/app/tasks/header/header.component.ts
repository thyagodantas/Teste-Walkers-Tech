import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userName: string | null; // Nome do usuário logado

  // Injeta o serviço de autenticação
  constructor(private authService: AuthService) {
    this.userName = this.authService.getUserName(); // Obtém o nome do usuário logado
  }
}
