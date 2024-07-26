import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-jsontodo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,MatProgressSpinnerModule],
  templateUrl: './jsontodo.component.html',
  styleUrls: ['./jsontodo.component.scss'],
  providers: [ApiService],
})
export class JsontodoComponent implements OnInit {
  task: string = '';
  tasks: any[] = [];
  editingIndex: number | any;
  searchTerm: string = '';
  loading: boolean = false; 
  errorMessage: string = ''; 

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.loading = true; 
    this.errorMessage = ''; 
    this.api.getTodos().subscribe(
      (data) => {
        console.log('Fetched tasks:', data);
        this.tasks = data;
        this.loading = false; // Hide spinner
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Error fetching tasks. Please try again later.';
        this.loading = false; // Hide spinner
      }
    );
  }

  onSubmit(): void {
    if (this.task.trim()) {
      const newTodo = { title: this.task.trim(), completed: false };
      if (this.editingIndex !== null && this.editingIndex >= 0 && this.editingIndex < this.tasks.length) {
        //  this below code for the Editing existing task
        const id = this.tasks[this.editingIndex].id;
        this.loading = true; // Show spinner
        this.errorMessage = ''; 
        this.api.updateTodo(id, newTodo).subscribe(
          (updatedTodo) => {
            console.log('Updated task:', updatedTodo);
            this.tasks[this.editingIndex] = updatedTodo;
            this.editingIndex = null;
            this.task = '';
            this.loading = false; // Hide spinner
          },
          (error) => {
            console.error('Error updating task:', error);
            this.errorMessage = 'Error updating task. Please try again later.';
            this.loading = false; // Hide spinner
          }
        );
      } else {
        // Adding new task here
        this.loading = true; // Show spinner
        this.errorMessage = ''; 
        this.api.addTodo(newTodo).subscribe(
          (addedTodo) => {
            alert('Data Added Successfully..');
            console.log('Added task:', addedTodo);
            this.tasks.unshift(addedTodo);
            this.task = '';
            this.loading = false; // Hide spinner
          },
          (error) => {
            console.error('Error adding task:', error);
            this.errorMessage = 'Error adding task. Please try again later.';
            this.loading = false; // Hide spinner
          }
        );
      }
    } else {
      alert('Please enter a task');
    }
  }

  onDelete(index: number): void {
    const userConfirmed = confirm('Data will be deleted?');
    if (userConfirmed) {
      const id = this.tasks[index].id;
      this.loading = true; // Show spinner
      this.errorMessage = ''; 
      this.api.deleteTodo(id).subscribe(
        () => {
          console.log('Deleted task with ID:', id);
          this.tasks.splice(index, 1);
          this.loading = false; // Hide spinner
        },
        (error) => {
          console.error('Error deleting task:', error);
          this.errorMessage = 'Error deleting task. Please try again later.';
          this.loading = false; // Hide spinner
        }
      );
    }
  }

  onEdit(index: number): void {
    this.task = this.tasks[index].title;
    this.editingIndex = index;
  }

  get filteredTasks(): any[] {
    return this.tasks.filter(task => task.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  logOut() {
    this.router.navigate(['login']);
  }
}
