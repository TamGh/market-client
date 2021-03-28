import { AbstractControl } from '@angular/forms';

export class OnlyNumbersValidator {
  public static validate(control: AbstractControl) {
    const REGEXP = /^(\d+\.)?\d+$/i;
    return control.value && control.value !== '' && !REGEXP.test(control.value)
      ? {
          validateOnlyNumbers: {
            valid: false,
            validateText: 'Invalid number',
          },
        }
      : null;
  }
}