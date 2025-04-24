import { Component, inject, Input, OnInit } from '@angular/core';
import { MoviesApiService } from '../../../services/movies-api.service';
import { Movie } from '../../../interfaces/movie';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../../../services/translate-service.service';
import { Language } from '../../../enums/language.enum';

@Component({
  selector: 'app-all-movies',
  imports: [FormsModule],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css'
})
export class AllMoviesComponent implements OnInit {
  translateService = inject(TranslateService);
  movies: Movie[] = [];
  currentPage = 0;
  totalPages = 0;
  yearInput: number | null = null;
  winnerFilter: 'all' | 'yes' | 'no' = 'all';
  id = "";
  year = "";
  title = "";
  winner = "";
  year_placeholder = "";
  all = "";
  winners = "";
  not_winners = "";
  search_label = "";
  previous = "";
  next = "";

  constructor(private moviesApi: MoviesApiService) {}

  async ngOnInit() {
    await this.translateService.use(Language.Portuguese, 'movies');
      this.id = this.translateService.translate("id")
      this.year = this.translateService.translate("year")
      this.title = this.translateService.translate("title")
      this.winner = this.translateService.translate("winner")
      this.year_placeholder = this.translateService.translate("year-placeholder")
      this.all = this.translateService.translate("all")
      this.winners = this.translateService.translate("winners")
      this.not_winners = this.translateService.translate("not-winners")
      this.search_label = this.translateService.translate("search")
      this.previous = this.translateService.translate("previous")
      this.next = this.translateService.translate("next")

    this.loadMovies(0); 
  }

  search(): void {
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
