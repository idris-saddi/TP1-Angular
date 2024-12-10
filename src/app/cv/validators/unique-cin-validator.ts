import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { catchError, debounceTime, distinctUntilChanged, distinctUntilKeyChanged, map, of, switchMap } from 'rxjs';

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl) => {

    if (!control.value) {
      return of(null);
    }

    return cvService.findUserByCin(control.value).pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      map((userExists) => (userExists ? { userExists: true } : null)), 
      catchError(() => of(null)) 
    );
  };
}
