import { Component, inject, signal, computed } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
  standalone: true,
  imports: [DefaultImagePipe],
})
export class DetailsCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);

  // Signal to store the current CV
  cv = signal<Cv | null>(null);

  constructor() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.cvService.getCvById(id).subscribe({
      next: (cv) => {
        this.cv.set(cv);
      },
      error: () => {
        this.router.navigate([APP_ROUTES.cv]);
      },
    });
  }

  deleteCv() {
    const currentCv = this.cv();
    if (!currentCv) return;

    this.cvService.deleteCvById(currentCv.id).subscribe({
      next: () => {
        this.toastr.success(`${currentCv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(`Problème avec le serveur veuillez contacter l'admin`);
      },
    });
  }
}
