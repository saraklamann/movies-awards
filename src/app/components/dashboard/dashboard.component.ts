import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MultipleWinnersTableComponent } from './tables/multiple-winners-table/multiple-winners-table.component';
import { TopStudiosTableComponent } from './tables/top-studios-table/top-studios-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [MultipleWinnersTableComponent, TopStudiosTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}
