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

  public save(form: FormGroup): void {
    //this.form.patchValue({'prefix': '$$$$'});
    //let valid = this.recurseIsValid(this.form);
    //if (!valid) {
//      return;
    //}
    // for (let controlName in this.form.controls) {
    //   const control = this.form.get(controlName);
    //   let value = control.value;
    //   //this.setToValue(this.profile, value, controlName);
    // }
    //console.log(this.profile);
  }

  setToValue(obj, value, path): void {
    let i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]];
    }
    obj[path[i]] = value;
  }

}
