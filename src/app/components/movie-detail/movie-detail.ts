import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetailComponent {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie = signal<Movie | undefined>(undefined);
  loading = signal(true);
  error = signal(false);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieDetail(id).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}