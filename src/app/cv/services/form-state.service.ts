import { Injectable } from '@angular/core';
import { CONSTANTES } from 'src/config/const.config';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  saveFormState(state: any) {
    sessionStorage.setItem(CONSTANTES.cvForm_key, JSON.stringify(state));
  }

  getFormState(): any | null {
    const savedState = sessionStorage.getItem(CONSTANTES.cvForm_key);
    return savedState ? JSON.parse(savedState) : null;
  }

  clearFormState() {
    sessionStorage.removeItem(CONSTANTES.cvForm_key);
  }
}
