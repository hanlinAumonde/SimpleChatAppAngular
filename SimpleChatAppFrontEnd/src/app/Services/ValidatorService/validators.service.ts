import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() {}

  specialCharValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /[<>/\\{}[\]()=+*?!@#$%^&|~`;]/;
      const invalid = regex.test(control.value);
      return invalid ? { specialChars: true } : null;
    };
  }

  dateFormatValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateStringFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
      const invalid = !dateStringFormat.test(control.value);
      return invalid ? { invalidDateFormat: true } : null;
    };
  }
}
