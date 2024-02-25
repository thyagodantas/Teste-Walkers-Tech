import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../Task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  newTask: Task = new Task('', '', '', '', false); // Cria uma nova instância de Task

  @Output() taskAdded = new EventEmitter<Task>(); // Cria um evento para adicionar uma task

  // Método para adicionar uma task
  addTask(): void {
    if (this.isValidTask()) {
      this.taskAdded.emit(this.newTask);
      this.newTask = new Task('', '', '', '', false); // Limpar os campos após adicionar
    }
  }

  // Método para verificar se a task é válida
  private isValidTask(): boolean {
    return (
      this.newTask.name.trim() !== '' &&
      this.newTask.description.trim() !== '' &&
      this.newTask.date.trim() !== '' &&
      this.newTask.time.trim() !== ''
    );
  }
}
