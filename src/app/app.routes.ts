import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'try',
        loadComponent: () => import('./components/try/try.component').then(m => m.TryComponent)
    },
    {
        path: 'registration',
        loadComponent: () => import('./components/signup-form/signup-form.component').then(m => m.SignupFormComponent)
    }
];
