import { Component, OnInit, inject } from '@angular/core';
import { User, UsersService } from "../users.service";
import * as ChartJs from 'chart.js/auto';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css'],
  standalone: true,
  imports: [UserListComponent]
})
export class RhComponent implements OnInit {
  private userService = inject(UsersService);

  oddUsers: User[];
  evenUsers: User[];
  chart: any;

  constructor() {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }

  ngOnInit(): void {
    this.createChart();
  }

  addUser(list: User[], newUser: string) {
    // Add the user to the correct list
    this.userService.addUser(list, newUser);

    // After adding the user, update the chart data
    if (list === this.oddUsers) {
      this.chart.data.datasets[0].data[0] = this.oddUsers.length; // Update workers count
    } else if (list === this.evenUsers) {
      this.chart.data.datasets[0].data[1] = this.evenUsers.length; // Update boss count
    }

    // Update the chart
    this.chart.update();
  }

  createChart() {
    const data = [
      { users: 'Workers', count: this.oddUsers.length },
      { users: 'Boss', count: this.evenUsers.length },
    ];

    this.chart = new ChartJs.Chart("MyChart", {
      type: 'bar',
      data: {
        labels: data.map(row => row.users),
        datasets: [{
          label: 'Entreprise stats',
          data: data.map(row => row.count),
        }]
      }
    });
  }
}
