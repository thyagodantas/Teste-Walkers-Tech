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
    // Injeta o AuthService
    this.userForm = this.fb.group({
      // Cria um FormGroup com os campos do formulário
      name: ['', Validators.required], // O campo name é obrigatório
      email: ['', [Validators.required, Validators.email]], // O campo email é obrigatório e deve ser um email válido
      password: ['', [Validators.required, Validators.minLength(6)]], // O campo password é obrigatório e deve ter no mínimo 6 caracteres
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
