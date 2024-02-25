import { Component, OnInit } from '@angular/core';
import { Task } from '../Task.model';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css'],
})
export class ListTasksComponent implements OnInit {
  tasks: Task[] = []; // Array de tasks
  editingIndex: number = -1; // Índice da tarefa em edição

  constructor() {}

  ngOnInit(): void {
    this.loadTasks(); // Inicia as tasks salvas no loalStorage
  }

  addTask(task: Task) {
    this.tasks.push(task); // Adiciona a task no array

    this.saveTasks(); // Salva a task no localStorage
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1); // Remove a task do array

    this.saveTasks(); // Salva a task no localStorage
  }

  toggleTaskCompletion(index: number): void {
    // Alternar estado de conclusão da tarefa
    this.tasks[index].completed = this.tasks[index].completed;

    // Salvar no localStorage
    this.saveTasks();
  }

  isEditing(index: number): boolean {
    return this.editingIndex === index;
  }

  startEditing(index: number): void {
    this.editingIndex = index; // Inicia a edição da task
  }

  cancelEditing(): void {
    this.editingIndex = -1; // Cancela a edição da task
  }

  saveEditing(index: number): void {
    this.saveTasks(); // Salva a task no localStorage

    this.editingIndex = -1; // Cancela a edição da task
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Salva a task no localStorage
  }

  private loadTasks(): void {
    const storageTasks = localStorage.getItem('tasks'); // Busca as tasks salvas no localStorage
    this.tasks = storageTasks ? JSON.parse(storageTasks) : []; // Converte as tasks salvas em JSON e adiciona no array
  }
}
