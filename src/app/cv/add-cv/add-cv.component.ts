import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../model/cv';
import { uniqueCinValidator } from '../validators/unique-cin-validator';
import { cinAgeValidator } from '../validators/age-cin-validator';
import { FormStateService } from '../services/form-state.service';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formSubmitted = false;

  private cvService = inject(CvService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private formStateService = inject(FormStateService);

  constructor() {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        path: [''],
        job: ['', Validators.required],
        age: [
          null,
          {
            validators: [
              Validators.required,
              Validators.min(1), // Optional: Set minimum value for age
              Validators.max(100), // Optional: Set maximum value for age
            ],
          },
        ],
        cin: [
          '',
          {
            validators: [Validators.required, Validators.pattern('^[0-9]{8}$')],
            asyncValidators: [uniqueCinValidator(this.cvService)],
            updateOn: 'blur',
          },
        ],
      },
      {
        validators: [cinAgeValidator()],
      }
    );

    // Disable or enable the `path` field based on the value of `age`
    this.form.get('age')?.valueChanges.subscribe((age) => {
      if (age !== null && age < 18) {
        this.path.disable();
      } else {
        this.path.enable();
      }
    });
  }

  addCv(): void {
    if (this.form.invalid) {
      this.toastr.error('Veuillez corriger les erreurs avant de soumettre.');
      return;
    }

    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv: Cv) => {
        this.toastr.success(
          `Le CV de ${cv.firstname} ${cv.name} a été ajouté avec succès.`
        );
        this.formSubmitted = true;
        this.formStateService.clearFormState();
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(
          "Une erreur s'est produite, veuillez contacter l'administrateur."
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname(): AbstractControl {
    return this.form.get('firstname')!;
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job(): AbstractControl {
    return this.form.get('job')!;
  }
  get path(): AbstractControl {
    return this.form.get('path')!;
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }

  ngOnInit() {
    const savedState = this.formStateService.getFormState();
    if (savedState) {
      this.form.setValue(savedState);
    }
  }

  ngOnDestroy() {
    if (this.form.valid && !this.formSubmitted) {
      this.formStateService.saveFormState(this.form.value);
    }
  }
}
