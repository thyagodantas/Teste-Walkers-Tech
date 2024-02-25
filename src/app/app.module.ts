import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';
import { TasksComponent } from './tasks/tasks.component';
import { HeaderComponent } from './tasks/header/header.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';

const routes: Routes = [
  { path: '', component: FormLoginComponent },
  { path: 'cadastro', component: FormCadastroComponent },
  { path: 'tasks', component: TasksComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    FormCadastroComponent,
    TasksComponent,
    HeaderComponent,
    AddTaskComponent,
    ListTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
