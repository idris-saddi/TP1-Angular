import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  
  // Memoization cache for Fibonacci
  private fibCache: { [key: number]: number } = {};

  // Optimized Fibonacci function with memoization
  fibo(n: number): number {
    if (n === 0 || n === 1) {
      return 1;
    }

    // Check if the value is already in the cache
    if (this.fibCache[n] !== undefined) {
      return this.fibCache[n];
    }

    // Otherwise, calculate and store it in the cache
    this.fibCache[n] = this.fibo(n - 1) + this.fibo(n - 2);
    console.log({ n, fib: this.fibCache[n] });

    return this.fibCache[n];
  }

  // Function to add a user
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
}
