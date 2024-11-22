import { NgModule } from "@angular/core";
import { RouterModule} from "@angular/router";
import { Routes } from "@angular/router";

// Define the routes
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'cv',
    loadComponent: () => import('./cv/cv/cv.component').then(m => m.CvComponent),
    children: [
      {
        path: 'add',
        loadComponent: () => import('./cv/add-cv/add-cv.component').then(m => m.AddCvComponent), // Lazy load AddCvComponent
      },
      {
        path: ':id',
        loadComponent: () => import('./cv/details-cv/details-cv.component').then(m => m.DetailsCvComponent), // Lazy load DetailsCvComponent
      },
    ],
  },
  {
    path: 'rh',
    loadComponent: () => import('./optimizationPattern/rh/rh.component').then(m => m.RhComponent),
  },
  {
    path: 'ttc',
    loadComponent: () => import('./components/ttc-calculator/ttc-calculator.component').then(m => m.TtcCalculatorComponent),
  },
  {
    path: '',
    loadComponent: () => import('./templates/front/front.component').then(m => m.FrontComponent),
    children: [
      {
        path: 'todo',
        loadComponent: () => import('./todo/todo/todo.component').then(m => m.TodoComponent),
      },
      {
        path: 'word',
        loadComponent: () => import('./directives/mini-word/mini-word.component').then(m => m.MiniWordComponent),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () => import('./templates/admin/admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: 'color',
        loadComponent: () => import('./components/color/color.component').then(m => m.ColorComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./components/nf404/nf404.component').then(m => m.NF404Component),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
