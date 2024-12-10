import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {User} from "../users.service";
import { FormsModule } from '@angular/forms';
import Memo from 'memo-decorator'

export const fibonnaci = (n: number): number => {
  if (n==1 || n==0) {
    return 1;
  }
  return fibonnaci(n-1) + fibonnaci(n-2);
}

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: true,
    imports: [FormsModule],
    changeDetection:ChangeDetectionStrategy.OnPush //changes here trigger unecessary checks for rh 
    //only run change detection whe input ref changes or event emitted
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';

  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
  @Memo() // caches res of fibo for same n will return the cached result without recalculating !!
  fibo(n: number): number {
    const fib = fibonnaci(n);
    console.log({n, fib});
    return fib;
  }
}
