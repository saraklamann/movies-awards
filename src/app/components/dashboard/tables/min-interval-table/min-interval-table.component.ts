import { Component } from '@angular/core';
import { ProducerInterval } from '../../../../interfaces/producer-interval-response';
import { MoviesApiService } from '../../../../services/movies-api.service';

@Component({
  selector: 'app-min-interval-table',
  imports: [],
  templateUrl: './min-interval-table.component.html',
  styleUrl: './min-interval-table.component.css'
})
export class MinIntervalTableComponent {
  shortestInterval: ProducerInterval = {
    producer: '',
    interval: 0,
    previousWin: 0,
    followingWin: 0
  };

  constructor(private moviesService: MoviesApiService) {}

  ngOnInit(): void {
    this.moviesService.getShortestInterval().subscribe((interval) => {
      console.log('Recebendo intervalo:', interval); 
      this.shortestInterval = interval[0];
    });
  }
}
