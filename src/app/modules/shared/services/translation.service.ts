import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export class TranslationSet {
  public language: string
  public values: {}
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public languages = ['en_US', 'pt_BR']
  public language = 'en_US';

  private dictionary: { [key: string]: TranslationSet } = {}

  constructor(private http: HttpClient) {
    this.loadTranslation('en_US');
  }

  loadTranslation(name: string): void {
    this.http.get<{ [key: string]: string }>('assets/i18n/' + name + '.json').subscribe((data) => {
      this.dictionary[name] = {language: name, values: data};
    });
  }

  translate(key: string, args: any[]): string {
    if (this.dictionary[this.language] != null) {
      let template = this.dictionary[this.language].values[key];
      if (!template) {
        return key;
      } else if (args.length == 0) {
        return template;
      }
      for (let i = 0; i < args.length; i++) {
        template = template.replace('{' + i + '}', args[i]);
      }
      return template;
    } else {
      return '...';
    }
  }

}
