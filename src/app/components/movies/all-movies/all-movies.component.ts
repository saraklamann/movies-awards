import { Component, Input, OnInit } from '@angular/core';
import { MoviesApiService } from '../../../services/movies-api.service';
import { Movie } from '../../../interfaces/movie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-movies',
  imports: [FormsModule],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css'
})
export class AllMoviesComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 0;
  totalPages = 0;
  yearInput: number | null = null;
  winnerFilter: 'all' | 'yes' | 'no' = 'all';

  constructor(private moviesApi: MoviesApiService) {}

  ngOnInit(): void {
    this.loadMovies(0); 
  }

  search(): void {
    console.log('Buscando com filtros:', this.yearInput, this.winnerFilter);
    this.loadMovies(0);
  }

  loadMovies(page: number = 0): void {
    const hasYear = this.yearInput;
    const hasWinner = this.winnerFilter !== 'all';

    if (hasYear || hasWinner) {
      const winnerValue = this.winnerFilter === 'yes' ? true : this.winnerFilter === 'no' ? false : undefined;
      this.moviesApi.getFilteredMovies(this.yearInput, winnerValue, page).subscribe((response) => {
        this.movies = response.movies;
        this.totalPages = response.page.totalPages;
        this.currentPage = response.page.number;
      });
    } else {
      this.moviesApi.getAllMovies(page).subscribe(({ movies, page: pageData }) => {
        this.movies = movies;
        this.currentPage = pageData.number;
        this.totalPages = pageData.totalPages;
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadMovies(page);
    }
  }
}
