import { Component, NgZone, OnInit, inject } from '@angular/core';
import { User, UsersService } from '../users.service';
import * as ChartJs from 'chart.js/auto';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
  standalone: true,
  imports: [UserListComponent],
})
export class RhComponent implements OnInit {
  private userService = inject(UsersService);
  private ngZone = inject(NgZone);

  oddUsers: User[];
  evenUsers: User[];
  chart: any;

  constructor() {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => this.createChart());
  }

  addUser(list: User[], newUser: string) {
    this.userService.addUser(list, newUser);
    this.updateChart();
  }

  createChart() {
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    this.chart = new ChartJs.Chart('MyChart', {
      type: 'bar',
      data: {
        labels: data.map((row) => row.users),
        datasets: [
          {
            label: 'Entreprise stats',
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }

  updateChart() {
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];
    if (this.chart) {
      this.chart.data.datasets[0].data = data.map((row) => row.count);
      this.ngZone.runOutsideAngular(() => this.chart.update());
    }
  }
}
/*
remarque Chart.js, where updates to the DOM or data occur directly through the library,
bypassing Angular’s zone-based change detection. => OUT OF BOUND CHANGE DETECTION DONC
ANGULAR DOESNT AUTOMATICALLY RECOGNIZE THESE CHANGES SO INTERFACE UPDATES WONT HAPPEN
for example when i added a boss the length displayed in the chart didnt change !!
updates without informing angular so we have to manually update the chart ?
*/
