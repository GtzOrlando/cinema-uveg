import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list';
import { MovieDetailComponent } from './components/movie-detail/movie-detail';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];