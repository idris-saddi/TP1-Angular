import { Component, inject, effect, signal } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { ListComponent } from '../list/list.component';
import { CvCardComponent } from '../cv-card/cv-card.component';
import { EmbaucheComponent } from '../embauche/embauche.component';
import { UpperCasePipe, DatePipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  standalone: true,
  imports: [
    ListComponent,
    CvCardComponent,
    EmbaucheComponent,
    UpperCasePipe,
    DatePipe,
  ],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs: Cv[] = []; // Signal for the list of CVs
  selectedCv: Cv | null = null; // Signal for the selected CV
  date = new Date();

  constructor() {
    this.cvService.getCvs().subscribe({
      next: (fetchedCvs) => {
        this.cvs = fetchedCvs;
      },
      error: () => {
        this.toastr.error(`
            Attention!! Les données sont fictives, problème avec le serveur.
            Veuillez contacter l'admin.`);
      },
    });

    const selected = this.cvService.getSelectedCv();
    if (selected) {
      this.selectedCv = selected;
    }

    // Logger and welcome message
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenue dans notre CvTech');
  }

  /**
   * Selects a CV to display details.
   * @param cv: Cv
   */
  selectCv(cv: Cv) {
    this.cvService.selectCv(cv); // Update the selected CV in the service
  }
}
