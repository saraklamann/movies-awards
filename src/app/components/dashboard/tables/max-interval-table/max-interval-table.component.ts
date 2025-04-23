import { Component } from '@angular/core';
import { ProducerInterval } from '../../../../interfaces/producer-interval-response';
import { MoviesApiService } from '../../../../services/movies-api.service';

@Component({
  selector: 'app-max-interval-table',
  imports: [],
  templateUrl: './max-interval-table.component.html',
  styleUrl: './max-interval-table.component.css'
})
export class MaxIntervalTableComponent {
  longestInterval: ProducerInterval = {
    producer: '',
    interval: 0,
    previousWin: 0,
    followingWin: 0
  };

  constructor(private moviesService: MoviesApiService) {}

  ngOnInit(): void {
    this.moviesService.getLongestInterval().subscribe((interval) => {
      console.log('Recebendo intervalo:', interval); 
      this.longestInterval = interval[0];
    });
  }
}
