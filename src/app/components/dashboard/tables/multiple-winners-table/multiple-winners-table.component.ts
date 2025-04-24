import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../../../interfaces/movie';
import { MoviesApiService } from '../../../../services/movies-api.service';
import { MultipleWinnersResponse } from '../../../../interfaces/multiple-winners-response';
import { TranslateService } from '../../../../services/translate-service.service';
import { Language } from '../../../../enums/language.enum';

@Component({
  selector: 'app-multiple-winners-table',
  imports: [],
  templateUrl: './multiple-winners-table.component.html',
  styleUrl: './multiple-winners-table.component.css'
})
export class MultipleWinnersTableComponent implements OnInit {
  multipleWinners: MultipleWinnersResponse[] = [];
  translateService = inject(TranslateService);
  year_label = "";
  win_count_label = "";

  constructor(private moviesService: MoviesApiService) {}

  async ngOnInit() {
    await this.translateService.use(Language.Portuguese, 'multiple-winners');
      this.year_label = this.translateService.translate("year-label")
      this.win_count_label = this.translateService.translate("win-count-label")
    
    this.moviesService.getMultipleWinners().subscribe((result) => {
    this.multipleWinners = result;
    });
  }

}
