import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './todo.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private todoList: Observable<Array<String>>;
  todo: String;

  constructor(private todoAPI: TodoService) { }

  ngOnInit(): void {
    this.todoList = this.todoAPI.getTodoList();
  }

  addTodo(todo: String) {
    this.todoAPI.addTodo(todo).subscribe((e) => console.log(e));
  }


}
