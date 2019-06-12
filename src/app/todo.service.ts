import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private apollo: Apollo) { }

  getTodoList(): Observable<Array<String>> {
    const query = gql`
      {
        todoList
      }
    `

    return this.apollo.watchQuery<{ todoList: Array<String> }>({
      query
    }).valueChanges.pipe(
      map(({ data }) => data.todoList)
    );
  }


  addTodo(todo: String) {
    const mutation = gql`
      mutation todo {
        addTodo(todo: "${todo}")
      }
    `

    return this.apollo.mutate({
      mutation
    })
  }
}
