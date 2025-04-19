import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate-service.service';
import { Language } from '../../enums/language.enum';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  translateService = inject(TranslateService);
  title = "";
  dashboard_item = "";
  all_movies_item = "";

  async ngOnInit() {
    await this.translateService.use(Language.Portuguese, 'layout');
    this.title = this.translateService.translate("title")
    this.dashboard_item = this.translateService.translate("dashboard-item")
    this.all_movies_item = this.translateService.translate("all-movies-item")
  }
}
