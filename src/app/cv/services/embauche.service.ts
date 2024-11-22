import { Injectable, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  // Signal to hold the list of hired candidates
  private embauchees = signal<Cv[]>([]);

  constructor() {}

  /**
   * Returns the list of hired candidates.
   * @returns Cv[]
   */
  getEmbauchees(): Cv[] {
    return this.embauchees(); // Call the signal to get its value
  }

  /**
   * Hires a person if they are not already hired.
   * Otherwise, returns false.
   * @param cv - Cv
   * @returns boolean
   */
  embauche(cv: Cv): boolean {
    // Get the current value of the signal
    const currentEmbauchees = this.embauchees();
    if (!currentEmbauchees.includes(cv)) {
      // Update the signal with the new value
      this.embauchees.set([...currentEmbauchees, cv]);
      return true;
    }
    return false;
  }
}
