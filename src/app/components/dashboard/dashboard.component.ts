import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MultipleWinnersTableComponent } from './tables/multiple-winners-table/multiple-winners-table.component';
import { TopStudiosTableComponent } from './tables/top-studios-table/top-studios-table.component';
import { MaxIntervalTableComponent } from './tables/max-interval-table/max-interval-table.component';
import { MinIntervalTableComponent } from './tables/min-interval-table/min-interval-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [MultipleWinnersTableComponent, TopStudiosTableComponent, MaxIntervalTableComponent, MinIntervalTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}
