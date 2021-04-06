import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from "../services/translation.service";

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private service: TranslationService) {
  }

  transform(value: string, ...args: any[]): string {
    return this.service.translate(value, args);
  }

}
