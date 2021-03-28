import { AbstractControl } from '@angular/forms';

export class DecimalPatternValidator {
  public static validate(control: AbstractControl, num: number, dec: number) {
    const REGEXP = new RegExp(`^[+|-]?\\d{0,${num}}(\\.\\d{1,${dec}})?$`);
    return control.value && control.value !== '' && !REGEXP.test(control.value)
      ? {
          validateDecimalPattern: {
            num,
            dec,
            valid: false,
            errorText: `Maximum length: ${num || ''} digits + ${
              dec || ''
            } decimals.`,
          },
        }
      : null;
  }
}