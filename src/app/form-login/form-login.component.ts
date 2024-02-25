import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent {
  mensagem: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  fazerLogin(): void {
    const loginSucesso = this.authService.login();

    if (loginSucesso) {
      this.router.navigate(['/tasks']);
    } else {
      this.mensagem = 'Credenciais incorretas';
    }
  }
}
