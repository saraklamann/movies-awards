import { Component, Input, OnInit } from '@angular/core';
import { MoviesApiService } from '../../../services/movies-api.service';
import { Movie } from '../../../interfaces/movie';

@Component({
  selector: 'app-all-movies',
  imports: [],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css'
})
export class AllMoviesComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private moviesApi: MoviesApiService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 0): void {
    this.moviesApi.getAllMovies(page).subscribe(({ movies, page: pageData }) => {
      this.movies = movies;
      this.currentPage = pageData.number;
      this.totalPages = pageData.totalPages;
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadMovies(page);
    }
  }
}
