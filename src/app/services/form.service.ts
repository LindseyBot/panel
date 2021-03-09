import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {
  }

  public check(group: FormGroup): boolean {
    let valid = true;
    group.markAllAsTouched();
    for (let controlName in group.controls) {
      const control = group.get(controlName);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
        if (!control.valid) {
          valid = false;
        }
      } else if (control instanceof FormGroup) {
        if (!this.check(control)) {
          valid = false;
        }
      }
    }
    return valid;
  }

}
