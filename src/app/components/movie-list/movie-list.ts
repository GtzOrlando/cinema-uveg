import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink, DecimalPipe],
  standalone: true,
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieListComponent {
  private movieService = inject(MovieService);

  movies = signal<Movie[]>([]);
  loading = signal(true);
  error = signal(false);

  constructor() {
    this.movieService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}