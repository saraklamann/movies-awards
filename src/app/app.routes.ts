import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MoviesComponent } from './components/movies/movies.component';

export const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "dashboard", component: DashboardComponent},
  { path: "movies", component: MoviesComponent},
];
