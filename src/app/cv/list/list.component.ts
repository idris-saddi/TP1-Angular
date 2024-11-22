import { Component, Input } from '@angular/core';
import { Cv } from '../model/cv';
import { NgClass } from '@angular/common';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [
    NgClass,
    ItemComponent,
  ],
})
export class ListComponent {
  @Input({ required: true }) cvs: Cv[] | null = []; // Required input for clarity

  constructor() {}
}
