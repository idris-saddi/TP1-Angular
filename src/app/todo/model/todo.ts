// todo.model.ts
export type TodoStatus = 'waiting' | 'in progress' | 'in review' | 'done';

export class Todo {
  constructor(
    public name : string = '',
    public content : string = '',
    public status: TodoStatus = 'waiting',
  ) {}
}
