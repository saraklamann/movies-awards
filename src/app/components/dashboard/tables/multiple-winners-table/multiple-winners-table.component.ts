import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../../interfaces/movie';
import { MoviesApiService } from '../../../../services/movies-api.service';
import { MultipleWinnersResponse } from '../../../../interfaces/multiple-winners-response';

@Component({
  selector: 'app-multiple-winners-table',
  imports: [],
  templateUrl: './multiple-winners-table.component.html',
  styleUrl: './multiple-winners-table.component.css'
})
export class MultipleWinnersTableComponent implements OnInit {
  multipleWinners: MultipleWinnersResponse[] = [];

  constructor(private moviesService: MoviesApiService) {}

  ngOnInit(): void {
    this.moviesService.getMultipleWinners().subscribe((result) => {
      this.multipleWinners = result;
    });
  }

}
