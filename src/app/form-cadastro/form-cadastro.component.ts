import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css'],
})
export class FormCadastroComponent {
  userForm: FormGroup;
  mensagem: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  cadastrar(): void {
    // Obtém os valores do formulário
    const userValues = this.userForm.value;

    // Cria um objeto User com os valores do formulário
    const user = {
      name: userValues.name,
      email: userValues.email,
      password: userValues.password,
    };

    // Chama a função cadastrarUsuario no AuthService
    const cadastradoComSucesso = this.authService.cadastrarUsuario(user);

    if (cadastradoComSucesso) {
      this.mensagem = 'Usuário cadastrado com sucesso';
    } else {
      this.mensagem = 'Erro ao cadastrar usuário';
    }
  }
}
