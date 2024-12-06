import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cinAgeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const age = group.get('age')?.value;
    const cin = group.get('cin')?.value?.toString();

    if (age === null || !cin) return null;

    const firstTwoDigits = parseInt(cin.substring(0, 2), 10);
    if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
      return { cinFirstChars: 'For age >= 60, first two CIN digits must be 00-19.' };
    }
    if (age < 60 && firstTwoDigits <= 19) {
      return { cinFirstChars: 'For age < 60, first two CIN digits must be > 19.' };
    }

    return null;
  };
}