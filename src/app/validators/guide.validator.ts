import {AbstractControl, ValidatorFn} from '@angular/forms';

export function guideValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control) {
      console.log(control);
      return {'provided': false}
    }
    return null;
  }

}
