import { Component, Input, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { NgStyle } from '@angular/common';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [NgStyle, DefaultImagePipe],
})
export class ItemComponent {
  private cvService = inject(CvService);

  @Input({ required: true }) cv!: Cv; // The CV to display, required input
  @Input() size = 50; // Optional input to control image size

  constructor() {}

  /**
   * Selects the current CV and notifies the CvService.
   */
  onSelectCv() {
    this.cvService.selectCv(this.cv);
  }
}
