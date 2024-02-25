import { Injectable } from '@angular/core';
import { User } from './user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorageKey = 'user'; // Chave para armazenar os usuários no localStorage

  loginForm: FormGroup; // Formulário de login

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      // Inicializa o formulário de login
      email: ['', [Validators.required, Validators.email]], // O campo 'email' é obrigatório e deve ser um e-mail válido
      password: ['', [Validators.required, Validators.minLength(6)]], // O campo 'password' é obrigatório e deve ter no mínimo 6 caracteres
    });
  }

  // Método para cadastrar um novo usuário
  cadastrarUsuario(usuario: User): boolean {
    // Verifica se o campo 'name' está vazio ou contém apenas espaços em branco
    if (!usuario || !usuario.name || !usuario.name.trim()) {
      console.error('Nome do usuário inválido:', usuario.name);
      return false; // Nome do usuário inválido
    }

    // Verifica se os campos 'email' e 'password' estão vazios ou contêm apenas espaços em branco
    if (
      !usuario.email ||
      !usuario.email.trim() ||
      !usuario.password ||
      !usuario.password.trim()
    ) {
      console.error(
        'E-mail ou senha do usuário inválidos:',
        usuario.email,
        usuario.password
      );
      return false; // E-mail ou senha do usuário inválidos
    }

    const usuariosSalvosString = localStorage.getItem(this.localStorageKey); // Obtém a lista de usuários do localStorage

    try {
      const usuariosSalvos: User[] = JSON.parse(usuariosSalvosString || '[]'); // Usando '[]' como valor padrão se for null

      // Verifica se o usuário já existe
      const usuarioExistente = usuariosSalvos.find(
        (u) => u.email === usuario.email
      );

      if (!usuarioExistente) {
        // Adiciona o novo usuário à lista
        usuariosSalvos.push(usuario);

        // Atualiza o localStorage com a lista atualizada
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify(usuariosSalvos)
        );

        return true; // Cadastro bem-sucedido
      } else {
        return false; // Usuário já cadastrado
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return false; // Erro no processo de cadastro
    }
  }

  // Método para fazer login
  login(): boolean {
    const userValues = this.loginForm.value; // Obtém os valores do formulário de login

    const usuariosSalvosString = localStorage.getItem(this.localStorageKey); // Obtém a lista de usuários do localStorage

    try {
      const usuariosSalvos: User[] = JSON.parse(usuariosSalvosString || '[]');

      const usuario = usuariosSalvos.find((u) => u.email === userValues.email); // Busca o usuário pelo e-mail

      // Verifica se o usuário existe e a senha está correta
      if (usuario && usuario.password === userValues.password) {
        return true; // Login bem-sucedido
      } else {
        return false; // Credenciais incorretas
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false; // Erro no processo de login
    }
  }

  // Método para obter o nome do usuário
  getUserName(): string | null {
    const usuariosSalvosString = localStorage.getItem(this.localStorageKey); // Obtém a lista de usuários do localStorage

    try {
      const usuariosSalvos: User[] = JSON.parse(usuariosSalvosString || '[]');

      // Verifica se há usuários cadastrados
      if (usuariosSalvos.length > 0) {
        return usuariosSalvos[0].name; // Retorna o nome do primeiro usuário
      }

      return null; // Não há usuários cadastrados
    } catch (error) {
      console.error('Erro ao obter nome do usuário:', error);
      return null;
    }
  }
}
