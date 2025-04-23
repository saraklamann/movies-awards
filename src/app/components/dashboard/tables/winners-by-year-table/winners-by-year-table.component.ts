import { Component } from '@angular/core';
import { MoviesApiService } from '../../../../services/movies-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-winners-by-year-table',
  imports: [FormsModule],
  templateUrl: './winners-by-year-table.component.html',
  styleUrl: './winners-by-year-table.component.css'
})
export class WinnersByYearTableComponent {
  yearInput: number | null = null; 
  winners: { year: number; title: string; id: number }[] = [];

  constructor(private moviesService: MoviesApiService) {}

  onSearch() {
    if (this.yearInput) {
      this.moviesService.getWinnersByYear(this.yearInput).subscribe((winners) => {
        this.winners = winners; 
      });
    }
  }
}
