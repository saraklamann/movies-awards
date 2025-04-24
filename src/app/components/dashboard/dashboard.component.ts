import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MultipleWinnersTableComponent } from './tables/multiple-winners-table/multiple-winners-table.component';
import { TopStudiosTableComponent } from './tables/top-studios-table/top-studios-table.component';
import { MaxIntervalTableComponent } from './tables/max-interval-table/max-interval-table.component';
import { MinIntervalTableComponent } from './tables/min-interval-table/min-interval-table.component';
import { WinnersByYearTableComponent } from './tables/winners-by-year-table/winners-by-year-table.component';
import { TranslateService } from '../../services/translate-service.service';
import { Language } from '../../enums/language.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MultipleWinnersTableComponent, TopStudiosTableComponent, MaxIntervalTableComponent, MinIntervalTableComponent, WinnersByYearTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    translateService = inject(TranslateService);
    multiple_winners_title = "";
    top_3_studios_title = "";
    intervals_title = "";
    longest_title = "";
    shortest_title = "";
    winners_by_year_title = "";
  
    async ngOnInit() {
      await this.translateService.use(Language.Portuguese, 'dashboard');
      this.multiple_winners_title = this.translateService.translate("multiple-winners-title")
      this.top_3_studios_title = this.translateService.translate("top-3-studios-title")
      this.intervals_title = this.translateService.translate("intervals-title")
      this.longest_title = this.translateService.translate("longest-title")
      this.shortest_title = this.translateService.translate("shortest-title")
      this.winners_by_year_title = this.translateService.translate("winners-by-year-title")
    }
}
