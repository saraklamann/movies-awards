import { Component, inject, OnInit } from '@angular/core';
import { MoviesApiService } from '../../../../services/movies-api.service';
import { TranslateService } from '../../../../services/translate-service.service';
import { Language } from '../../../../enums/language.enum';

@Component({
  selector: 'app-top-studios-table',
  imports: [],
  templateUrl: './top-studios-table.component.html',
  styleUrl: './top-studios-table.component.css'
})
export class TopStudiosTableComponent implements OnInit {
  topStudios: { studio: string; wins: number }[] = [];
  translateService = inject(TranslateService);
  name = "";
  win_count = "";

  constructor(private moviesService: MoviesApiService) {}

  async ngOnInit() {
    await this.translateService.use(Language.Portuguese, 'top-3-studios');
      this.name = this.translateService.translate("name-label")
      this.win_count = this.translateService.translate("win-count-label")

    this.moviesService.getTop3Studios().subscribe((data) => {
      this.topStudios = data;
    });
  }
}
