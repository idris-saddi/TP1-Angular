import { Injectable, signal, computed, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private http = inject(HttpClient);

  private cvs = signal<Cv[]>([]);

  /**
   * Signal for the sfelected CV (if any).
   */
  private selectedCv = signal<Cv | null>(null);

  constructor() {
    const fakeCVs: Cv[] = [
      new Cv(1, 'aymen', 'sellaouti', 'teacher', 'as.jpg', '1234', 40),
      new Cv(2, 'skander', 'sellaouti', 'enfant', '       ', '1234', 4),
    ];
    this.cvs.set(fakeCVs);
  }

  /**
   * Returns the fake CVs stored locally.
   * @returns Cv[]
   */
  getFakeCvs(): Cv[] {
    return this.cvs();
  }

  /**
   * Returns the list of CVs from the API.
   * @returns Observable<Cv[]>
   */
  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API.cv).subscribe({
      next: (fetchedCvs) => {
        this.cvs = fetchedCvs;
      },
      error: () => {
        this.toastr.error(`
            Attention!! Les données sont fictives, problème avec le serveur.
            Veuillez contacter l'admin.`);
      },
    });
  }

  /**
   * Deletes a CV by its ID using the API.
   * @param id - ID of the CV to delete.
   * @returns Observable<any>
   */
  deleteCvById(id: number): Observable<any> {
    return this.http.delete<any>(`${API.cv}${id}`);
  }

  /**
   * Adds a new CV via the API.
   * @param cv - The CV to add.
   * @returns Observable<Cv>
   */
  addCv(cv: Cv): Observable<Cv> {
    return this.http.post<Cv>(API.cv, cv);
  }

  /**
   * Fetches a CV by its ID from the API.
   * @param id - ID of the CV to fetch.
   * @returns Observable<Cv>
   */
  getCvById(id: number): Observable<Cv> {
    return this.http.get<any>(`${API.cv}${id}`);
  }

  /**
   * Finds a CV by ID in the local signal store.
   * @param id - ID of the CV to find.
   * @returns Cv | null
   */
  findCvById(id: number): Cv | null {
    return this.cvs().find((cv) => cv.id === id) ?? null;
  }

  /**
   * Deletes a CV from the local signal store if found.
   * @param cv - The CV to delete.
   * @returns boolean
   */
  deleteCv(cv: Cv): boolean {
    const index = this.cvs().indexOf(cv);
    if (index > -1) {
      this.cvs.update((cvs) => cvs.filter((item) => item !== cv));
      return true;
    }
    return false;
  }

  /**
   * Filters CVs by name from the API.
   * @param name - Name to search for.
   * @returns Observable<Cv[]>
   */
  selectByName(name: string): Observable<Cv[]> {
    const search = `{"where":{"name":{"like":"%${name}%"}}}`;
    const params = new HttpParams().set('filter', search);
    return this.http.get<Cv[]>(API.cv, { params });
  }

  /**
   * Filters CVs by a property-value pair from the API.
   * @param property - The property to filter on.
   * @param value - The value to match.
   * @returns Observable<Cv[]>
   */
  selectByProperty(property: string, value: string): Observable<Cv[]> {
    const search = `{"where":{"${property}":"${value}"}}`;
    const params = new HttpParams().set('filter', search);
    return this.http.get<Cv[]>(API.cv, { params });
  }

  /**
   * Selects a CV and updates the `selectedCv` signal.
   * @param cv - The CV to select.
   */
  selectCv(cv: Cv): void {
    this.selectedCv.set(cv);
  }

  /**
   * Returns the currently selected CV signal.
   * @returns Cv | null
   */
  getSelectedCv(): Cv | null {
    return this.selectedCv();
  }

  /**
   * Logs the current state of CVs.
   */
  logCvs(): void {
    console.log(this.cvs());
  }
}
