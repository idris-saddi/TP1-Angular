import { Component, Input, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../services/embauche.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-cv-card',
  templateUrl: './cv-card.component.html',
  styleUrls: ['./cv-card.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    DefaultImagePipe,
  ],
})
export class CvCardComponent {
  private embaucheService = inject(EmbaucheService);
  private toastr = inject(ToastrService);

  @Input() cv: Cv | null = null;

  constructor() {}

  embaucher() {
    if (!this.cv) return;

    // Signal-based embauche logic
    const embauchees = this.embaucheService.getEmbauchees();
    if (!embauchees.includes(this.cv)) {
      this.embaucheService.embauche(this.cv);
      this.toastr.success(
        `${this.cv.firstname} ${this.cv.name} a été pré embauché`
      );
    } else {
      this.toastr.warning(
        `${this.cv.firstname} ${this.cv.name} est déjà pré embauché`
      );
    }
  }
}
