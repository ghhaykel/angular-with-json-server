import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskservice: TaskService) { }
  searchText = '';
  showForm = false;
  editForm = false;

  myTask: Task = {
    label: '',
    completed: false
  }
  tasks: Task[] = [];
  resultTasks: Task[] = [];

  ngOnInit() {
    this.getTasks();

  }

  getTasks() {
    this.taskservice.findAll()
      .subscribe(tasks => {
        this.resultTasks = this.tasks = tasks;
      })
  }
  deleteTask(id) {
    this.taskservice.delete(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id != id)
      })
  }

  persisteTask() {
    this.taskservice.persist(this.myTask)
      .subscribe((task) => {
        this.tasks = [task, ...this.tasks];
        this.resetTAsk();
        this.showForm = false;
      })
  }

  resetTAsk() {
    this.myTask = {
      label: '',
      completed: false
    }
  }

  toggleComplited(task) {
    this.taskservice.complited(task.id, task.completed)
      .subscribe(() => {
        task.complited = !task.complited
      })
  }

  editTask(task) {
    this.myTask = task;
    this.editForm = true
  }
  updateTask() {
    this.taskservice.update(this.myTask)
      .subscribe(task => {
        this.resetTAsk();
        this.editForm = false

      })
  }
  serachTasks() {
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }

}
