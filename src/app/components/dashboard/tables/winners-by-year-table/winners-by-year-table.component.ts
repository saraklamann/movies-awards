import { Component, inject, OnInit } from '@angular/core';
import { MoviesApiService } from '../../../../services/movies-api.service';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../../../../services/translate-service.service';
import { Language } from '../../../../enums/language.enum';

@Component({
  selector: 'app-winners-by-year-table',
  imports: [FormsModule],
  templateUrl: './winners-by-year-table.component.html',
  styleUrl: './winners-by-year-table.component.css'
})
export class WinnersByYearTableComponent implements OnInit {
  translateService = inject(TranslateService);
  id = "";
  year_placeholder = "";
  year_label = "";
  title_label = "";
  yearInput: number | null = null; 
  winners: { year: number; title: string; id: number }[] = [];

  constructor(private moviesService: MoviesApiService) {}

  async ngOnInit() {
    await this.translateService.use(Language.Portuguese, 'winners');
      this.id = this.translateService.translate("id-label")
      this.year_label = this.translateService.translate("year-label")
      this.year_placeholder = this.translateService.translate("year-placeholder")
      this.title_label = this.translateService.translate("title-label")
      
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
