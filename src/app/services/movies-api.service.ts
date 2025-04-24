import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { AllMoviesResponse } from '../interfaces/movies-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private _http = inject(HttpClient);

  getAllMovies(page: number = 0): Observable<{ movies: Movie[]; page: AllMoviesResponse['page'] }> {
    return this._http.get<AllMoviesResponse>(`/api/movies?page=${page}`).pipe(
      map((res) => {
        const movies = res._embedded.movies.map((movie, index) => ({
          ...movie,
          id: index + 1 + (res.page.size * res.page.number),
        }));
        return {
          movies,
          page: res.page,
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

  getTop3Studios(): Observable<{ studio: string; wins: number }[]> {
    return this._http.get<{ _embedded: { movies: Movie[] }; page: { totalPages: number } }>('/api/movies').pipe(
      switchMap((firstPage) => {
        const requests = [];
        for (let i = 2; i <= firstPage.page.totalPages; i++) {
          requests.push(
            this._http.get<{ _embedded: { movies: Movie[] } }>(`/api/movies?page=${i}`)
          );
        }

        return forkJoin([this._http.get<{ _embedded: { movies: Movie[] } }>('/api/movies'), ...requests]);
      }),
  
      map((responses) => {
        const allMovies: Movie[] = [];
        responses.forEach((response) => {
          allMovies.push(...response._embedded.movies);
        });

        const studioWins: { [studio: string]: number } = {};
        allMovies.forEach((movie) => {
          if (movie.winner) {
            movie.studios.forEach((studio) => {
              studioWins[studio] = (studioWins[studio] || 0) + 1;
            });
          }
        });

        const topStudios = Object.entries(studioWins)
          .map(([studio, wins]) => ({ studio, wins }))
          .sort((a, b) => b.wins - a.wins)
          .slice(0, 3);

        return topStudios;
      })
    );
  }

  getShortestInterval(): Observable<{ producer: string; interval: number; previousWin: number; followingWin: number }[]> {
    return this._http.get<{ _embedded: { movies: Movie[] }; page: { totalPages: number } }>('/api/movies').pipe(
      switchMap((firstPage) => {
        const requests = [];
        for (let i = 2; i <= firstPage.page.totalPages; i++) {
          requests.push(
            this._http.get<{ _embedded: { movies: Movie[] } }>(`/api/movies?page=${i}`)
          );
        }
  
        return forkJoin([this._http.get<{ _embedded: { movies: Movie[] } }>('/api/movies'), ...requests]);
      }),
  
      map((responses) => {
        const allMovies: Movie[] = [];
        responses.forEach((response) => {
          allMovies.push(...response._embedded.movies);
        });
  
        const producerIntervals: { [producer: string]: { years: number[] } } = {};
        allMovies.forEach((movie) => {
          if (movie.winner) {
            movie.producers.forEach((producer) => {
              if (!producerIntervals[producer]) {
                producerIntervals[producer] = { years: [] };
              }
              producerIntervals[producer].years.push(movie.year);
            });
          }
        });
  
        const intervals = Object.entries(producerIntervals)
          .map(([producer, data]) => {
            const sortedYears = data.years.sort((a, b) => a - b);
  
            if (sortedYears.length > 1) {
              let minInterval = Infinity;
              let previousYear = -1;
              let followingYear = -1;
  
              for (let i = 1; i < sortedYears.length; i++) {
                const interval = sortedYears[i] - sortedYears[i - 1];
                if (interval < minInterval) {
                  minInterval = interval;
                  previousYear = sortedYears[i - 1];
                  followingYear = sortedYears[i];
                }
              }
  
              return { producer, interval: minInterval, previousWin: previousYear, followingWin: followingYear };
            }
  
            return null;
          })
          .filter((interval) => interval !== null) 
  
          .sort((a, b) => a.interval - b.interval); 
  
        return intervals;
      })
    );
  }
  
  getLongestInterval(): Observable<{ producer: string; interval: number; previousWin: number; followingWin: number }[]> {
    return this._http.get<{ _embedded: { movies: Movie[] }; page: { totalPages: number } }>('/api/movies').pipe(
      switchMap((firstPage) => {
        const requests = [];
        for (let i = 2; i <= firstPage.page.totalPages; i++) {
          requests.push(
            this._http.get<{ _embedded: { movies: Movie[] } }>(`/api/movies?page=${i}`)
          );
        }
  
        return forkJoin([this._http.get<{ _embedded: { movies: Movie[] } }>('/api/movies'), ...requests]);
      }),
  
      map((responses) => {
        const allMovies: Movie[] = [];
        responses.forEach((response) => {
          allMovies.push(...response._embedded.movies);
        });
  
        const producerIntervals: { [producer: string]: { years: number[] } } = {};
        allMovies.forEach((movie) => {
          if (movie.winner) {
            movie.producers.forEach((producer) => {
              if (!producerIntervals[producer]) {
                producerIntervals[producer] = { years: [] };
              }
              producerIntervals[producer].years.push(movie.year);
            });
          }
        });
  
        const intervals = Object.entries(producerIntervals)
          .map(([producer, data]) => {
            const sortedYears = data.years.sort((a, b) => a - b);
            
            if (sortedYears.length > 1) {
              let maxInterval = 0;
              let previousYear = -1;
              let followingYear = -1;
  
              for (let i = 1; i < sortedYears.length; i++) {
                const interval = sortedYears[i] - sortedYears[i - 1];
                if (interval > maxInterval) {
                  maxInterval = interval;
                  previousYear = sortedYears[i - 1];
                  followingYear = sortedYears[i];
                }
              }
  
              return { producer, interval: maxInterval, previousWin: previousYear, followingWin: followingYear };
            }
  
            const latestYear = sortedYears[0];
            const oldestYear = Math.min(...sortedYears);
            const interval = latestYear - oldestYear;
            return {
              producer,
              interval,
              previousWin: oldestYear,
              followingWin: latestYear
            };
          })
          .sort((a, b) => b.interval - a.interval);
  
        return intervals;
      })
    );
  }  

  getFilteredMovies(year: number | null, winner: boolean | undefined, page: number = 0): Observable<{ movies: Movie[]; page?: any }> {
    const url = `/api/filtered-movies?year=${year ?? ''}&winner=${winner}&page=${page}`;
    console.log('URL da requisição filtrada:', url);
  
    return this._http.get<Movie[]>(url).pipe(
      map((res: Movie[]) => {
        const movies = res.map((movie, index) => ({
          ...movie,
          id: index + 1 + (page * 15), 
        }));
        return {
          movies,
          page: { number: page, totalPages: 1 }
        };
      })
    );
  }
}

