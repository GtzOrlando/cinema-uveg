import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { TMDB_API_KEY } from '../api-key';

interface TopRatedResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = TMDB_API_KEY;

  getTopRatedMovies(): Observable<TopRatedResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-MX')
      .set('page', '1');

    return this.http.get<TopRatedResponse>(`${this.apiUrl}/movie/top_rated`, { params });
  }

  getMovieDetail(id: number): Observable<Movie> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-MX');

    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`, { params });
  }
}