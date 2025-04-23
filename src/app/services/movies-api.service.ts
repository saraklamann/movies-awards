import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { MovieResponse } from '../interfaces/movies-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private _http = inject(HttpClient);

  getAllMovies(page: number = 0): Observable<{ movies: Movie[]; page: MovieResponse['page'] }> {
    return this._http.get<MovieResponse>(`/api/movies?page=${page}`).pipe(
      map((res: MovieResponse) => {
        const movies = res._embedded.movies.map((movie, index) => ({
          ...movie,
          id: index + 1 + (res.page.size * res.page.number),
        }));
        return {
          movies: movies,
          page: res.page
        };
      })
    );
  }
}

