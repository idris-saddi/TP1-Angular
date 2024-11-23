// cv.module.ts
import { NgModule } from '@angular/core';
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

export const cvRoutes: Routes = [
  { path: '', component: CvComponent },
  { path: 'add', component: AddCvComponent, canActivate: [AuthGuard] },
  { path: ':id', component: DetailsCvComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(cvRoutes)],
  exports: [RouterModule],
})
export class CvModule {}
