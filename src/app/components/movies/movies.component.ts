import { Component } from '@angular/core';
import { AllMoviesComponent } from './all-movies/all-movies.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AllMoviesComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
}
