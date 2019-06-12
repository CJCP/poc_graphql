import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private apollo: Apollo) { }

  getTodoList(): QueryRef<{ todoList: Array<String> }> {
    const query = gql`
      {
        todoList
      }
    `;

    return this.apollo.watchQuery({
      query
    });
  }

  addTodo(todo: String): Observable<Boolean> {
    const mutation = gql`
      mutation todo ($todo: String) {
        addTodo(todo: $todo)
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {
        todo
      }
    }).pipe(take(1));
  }
}
