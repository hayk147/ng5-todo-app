import { Component, OnInit } from '@angular/core';
import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) {
    this.taskService.getAllTasks().subscribe((tasks: Array<Task>) => {
      this.tasks = tasks.slice(0, 10);
    });
  }

  ngOnInit() {
  }

  addTask() {
    let title = prompt("Please enter task name");
    if (title != null && title != "") {
      let task = {
        'id': Math.floor(Math.random() * 10000000),
        'userId':  1,
        'title':  title,
        'completed':  false
      };
      this.tasks.push(task);
    }
  }

  removeTask(i:number) {
    this.tasks.splice(i, 1);
  }

}
