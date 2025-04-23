import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../enums/language.enum';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private http = inject(HttpClient);
  private language: Language = Language.Portuguese;
  private translations: any = {};

  async use(lang: Language, page: string): Promise<void> {
    this.language = lang;
    const path = `assets/i18n/${lang}/${page}.json`;
    this.translations = await this.http.get(path).toPromise();
  }
  

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
