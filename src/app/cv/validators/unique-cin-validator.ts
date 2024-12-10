import { AbstractControl, AsyncValidatorFn} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from "rxjs";

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return cvService.findUserByCin(control.value).pipe(
      catchError(() => of(null))
    );
  };

  // return (control: AbstractControl) => {  
  //   return control.valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((value) => {
  //       console.log('Checking CIN:', value);
  //       return cvService.findUserByCin(value).pipe(
  //         catchError(() => of(null))
  //       );
  //     })
  //   );
  // };
  
  
}


