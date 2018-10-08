import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Todo } from "src/app/todo";
//import 'rxjs/add/operator/toPromise';



@Injectable()
export class TodoService{
    private baseUrl = 'http://localhost:8084';

    constructor(private http:Http) { }

    getTodos(): Promise<Todo[]>{
        return this.http.get(this.baseUrl+'/api/todos').toPromise()
        .then(response => response.json() as Todo[])
        .catch(this.handleError);
    }

    createTodos(todoData: Todo): Promise<Todo> {
        return this.http.post(this.baseUrl + '/api/todos', todoData)
        .toPromise().then(response => response.json() as Todo)
        .catch(this.handleError);
    }

    updateTodo(todoData: Todo): Promise<Todo> {
        return this.http.put(this.baseUrl+ '/api/todos/' + todoData.id,todoData)
        .toPromise()
        .then(response => response.json() as Todo)
        .catch(this.handleError);
    }

    deleteTodo(id: string): Promise<any> {
        return this.http.delete(this.baseUrl + '/api/todos/' + id)
        .toPromise().catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Some error occured', error);
        return Promise.reject(error.message || error);
      }
}