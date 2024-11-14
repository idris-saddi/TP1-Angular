import { Injectable, signal, computed, inject } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { LoggerService } from '../../services/logger.service';

let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  private todos = signal<Todo[]>([]);

  private waitingTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'waiting')
  );

  private inProgressTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'in progress')
  );

  private inReviewTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'in review')
  );

  private doneTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'done')
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }

  getByStatus(status: TodoStatus): Todo[] {
    switch (status) {
      case 'waiting':
        return this.waitingTodos();
      case 'in progress':
        return this.inProgressTodos();
      case 'in review':
        return this.inReviewTodos();
      case 'done':
        return this.doneTodos();
      default:
        return [];
    }
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.update((todos) => [...todos, todo]);
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): boolean {
    const index = this.todos().indexOf(todo);
    if (index > -1) {
      this.todos.update((todos) => todos.filter((t) => t !== todo));
      return true;
    }
    return false;
  }

  getNextStatus(todo: Todo): TodoStatus | null {
    switch (todo.status) {
      case 'waiting':
        return 'in progress';
      case 'in progress':
        return 'in review';
      case 'in review':
        return 'done';
      default:
        return null;
    }
  }

  changeStatus(todo: Todo): void {
    const nextStatus = this.getNextStatus(todo);
    if (nextStatus) {
      this.todos.update((todos) =>
        todos.map((t) => (t === todo ? { ...t, status: nextStatus } : t))
      );
    }
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos);
  }
}
