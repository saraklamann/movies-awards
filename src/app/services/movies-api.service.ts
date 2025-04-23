import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { AllMoviesResponse } from '../interfaces/all-movies-response';
import { MultipleWinnersResponse } from '../interfaces/multiple-winners-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private _http = inject(HttpClient);

  getAllMovies(page: number = 0): Observable<{ movies: Movie[]; page: AllMoviesResponse['page'] }> {
    return this._http.get<AllMoviesResponse>(`/api/movies?page=${page}`).pipe(
      map((res: AllMoviesResponse) => {
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

  getMultipleWinners(): Observable<{ year: number; winnerCount: number }[]> {
    return this._http.get<AllMoviesResponse>(`/api/movies?page=0&size=15`).pipe(
      switchMap((firstPage) => {
        const totalPages = firstPage.page.totalPages;
        const requests = [];
  
        for (let page = 0; page < totalPages; page++) {
          requests.push(this._http.get<AllMoviesResponse>(`/api/movies?page=${page}&size=15`));
        }
  
        return forkJoin(requests);
      }),
      map((responses) => {
        const allMovies = responses.flatMap((res) => res._embedded.movies);
        const winners = allMovies.filter((movie) => movie.winner);
  
        const countByYear: Record<number, number> = {};
        for (const movie of winners) {
          countByYear[movie.year] = (countByYear[movie.year] || 0) + 1;
        }
  
        return Object.entries(countByYear)
          .filter(([_, count]) => count > 1)
          .map(([year, count]) => ({
            year: +year,
            winnerCount: count,
          }));
      })
    );
  }
}

