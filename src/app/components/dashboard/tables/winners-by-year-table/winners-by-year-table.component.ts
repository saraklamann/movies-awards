import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../../../services/movies-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-winners-by-year-table',
  imports: [FormsModule],
  templateUrl: './winners-by-year-table.component.html',
  styleUrl: './winners-by-year-table.component.css'
})
export class WinnersByYearTableComponent implements OnInit {
  yearInput: number | null = null; 
  winners: { year: number; title: string; id: number }[] = [];

  constructor(private moviesService: MoviesApiService) {}

  ngOnInit(): void {
    this.loadMovies(0); 
  }

  search(): void {
    this.loadMovies(0);
  }

  loadMovies(page: number = 0):void {
    this.moviesService.getFilteredMovies(this.yearInput, true, page).subscribe((response) => {
      this.winners = response.movies;
    });
  }
}
