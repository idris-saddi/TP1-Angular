import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'add', component: AddCvComponent, canActivate: [AuthGuard] },
  { path: ':id', component: DetailsCvComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvTechModule {}
