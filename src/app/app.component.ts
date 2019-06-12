import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './todo.service';
import { Subscription, Observable } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private todoList: Observable<Array<String>>
  todo: String;

  constructor(private todoAPI: TodoService) {

  }

  ngOnInit(): void {
    const todoQuery = this.todoAPI.getTodoList();
    this.subscribeToNewTodo(todoQuery);

    this.todoList = todoQuery.valueChanges.pipe(
      map(({ data }) => data.todoList)
    );

  }

  addTodo(todo: String) {
    this.todoAPI.addTodo(todo).subscribe();
  }

  subscribeToNewTodo(todoQuery: QueryRef<{ todoList: Array<String> }>) {
    const document = gql`
      subscription onTodoAdded {
        todoAdded
      }
    `;

    todoQuery.subscribeToMore<{ todoAdded: Array<String> }>({
      document,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        return {
          todoList: [...subscriptionData.data.todoAdded]
        };
      }
    });
  }



}
