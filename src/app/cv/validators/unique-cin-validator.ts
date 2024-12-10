import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    // If the field is empty, return null (valid)
    if (!control.value) {
      return of(null);
    }

    return cvService.findUserByCin(control.value).pipe(
      debounceTime(300), // Wait for 300ms after the last keystroke
      distinctUntilChanged(), // Avoid duplicate API calls with identical values
      map((userExists) => (userExists ? { userExists: true } : null)), // Return the validation error if the user exists
      catchError(() => of(null)) // Handle errors from the API gracefully
    );
  };
}
