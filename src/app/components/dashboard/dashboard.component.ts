import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MultipleWinnersTableComponent } from './tables/multiple-winners-table/multiple-winners-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [MultipleWinnersTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}
