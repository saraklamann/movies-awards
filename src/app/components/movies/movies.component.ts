import { Component, inject } from '@angular/core';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { TranslateService } from '../../services/translate-service.service';
import { Language } from '../../enums/language.enum';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AllMoviesComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  translateService = inject(TranslateService);
  all_movies = "";
  
  async ngOnInit() {
    await this.translateService.use(Language.Portuguese, 'movies');
      this.all_movies = this.translateService.translate("all-movies")
  }
}
