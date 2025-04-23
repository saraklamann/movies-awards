import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../../../services/movies-api.service';

@Component({
  selector: 'app-top-studios-table',
  imports: [],
  templateUrl: './top-studios-table.component.html',
  styleUrl: './top-studios-table.component.css'
})
export class TopStudiosTableComponent implements OnInit {
  topStudios: { studio: string; wins: number }[] = [];

  constructor(private moviesService: MoviesApiService) {}

  ngOnInit() {
    this.moviesService.getTop3Studios().subscribe((data) => {
      this.topStudios = data;
    });
  }
}
