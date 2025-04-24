import { Component, inject } from '@angular/core';
import { ProducerInterval } from '../../../../interfaces/producer-interval-response';
import { MoviesApiService } from '../../../../services/movies-api.service';
import { TranslateService } from '../../../../services/translate-service.service';
import { Language } from '../../../../enums/language.enum';

@Component({
  selector: 'app-min-interval-table',
  imports: [],
  templateUrl: './min-interval-table.component.html',
  styleUrl: './min-interval-table.component.css'
})
export class MinIntervalTableComponent {
  translateService = inject(TranslateService);
  producer_label = "";
  interval_label = "";
  previous_label = "";
  following_label = "";
  
  shortestInterval: ProducerInterval = {
    producer: '',
    interval: 0,
    previousWin: 0,
    followingWin: 0
  };

  constructor(private moviesService: MoviesApiService) {}

  async ngOnInit() {
    await this.translateService.use(Language.Portuguese, 'intervals');
      this.producer_label = this.translateService.translate("producer-label")
      this.interval_label = this.translateService.translate("interval-label")
      this.previous_label = this.translateService.translate("previous-label")
      this.following_label = this.translateService.translate("following-label")

    this.moviesService.getShortestInterval().subscribe((interval) => {
      this.shortestInterval = interval[0];
    });
  }
}
