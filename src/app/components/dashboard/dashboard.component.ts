import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MultipleWinnersTableComponent } from './tables/multiple-winners-table/multiple-winners-table.component';
import { TopStudiosTableComponent } from './tables/top-studios-table/top-studios-table.component';
import { MaxIntervalTableComponent } from './tables/max-interval-table/max-interval-table.component';
import { MinIntervalTableComponent } from './tables/min-interval-table/min-interval-table.component';
import { WinnersByYearTableComponent } from './tables/winners-by-year-table/winners-by-year-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MultipleWinnersTableComponent, TopStudiosTableComponent, MaxIntervalTableComponent, MinIntervalTableComponent, WinnersByYearTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}
