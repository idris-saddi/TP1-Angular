import { AbstractControl, AsyncValidatorFn} from "@angular/forms";
import { CvService } from "../services/cv.service";


export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
    return (control: AbstractControl) => {
    return cvService.findUserByCin(control.value);
    };
}