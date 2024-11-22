import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  catchError,
  of,
  tap,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}
  // parametres de la requete
  settingSubject = new BehaviorSubject<Settings>({
    limit: 12,
    skip: 0,
  });
  // existance d'autres produits a demander
  hasMoreSubject = new BehaviorSubject<boolean>(true);

  products$ = this.settingSubject.pipe(
    // arrete le flux lorsque il n'y a plus de produits
    takeWhile(() => this.hasMoreSubject.value),
    // traite les requete en ordre
    concatMap((setting) =>
      this.productService.getProducts(setting).pipe(
        // mise a jour du flux hasMore
        tap((data) => {
          this.hasMoreSubject.next(
            data.total > data.products.length + setting.skip
          );
          console.log(
            `fetched ${data.products.length + setting.skip} of ${
              data.total
            } products`
          );
        }),
        // extraction des produits de la reponse de requete
        map((data) => data.products),
        catchError(() => of([] as Product[]))
      )
    ),
    // accumuler les produits
    scan(
      (fetchedProducts: Product[], newProducts: Product[]) => [
        ...fetchedProducts,
        ...newProducts,
      ],
      []
    )
  );

  // expose hasMoreSubject pour la template
  hasMore$ = this.hasMoreSubject.asObservable();

  // mise a jour du flux de parametres
  loadMore(): void {
    if (this.hasMoreSubject.value) {
      const { limit, skip } = this.settingSubject.value;
      this.settingSubject.next({ limit, skip: skip + limit });
    }
  }

  /*
  ////// version declarative de loadMore
  loadMore$ = this.hasMore$.pipe(
    filter(hasMore => hasMore),
    switchMap(() => {
      const { limit, skip } = this.settingSubject.value;
      return of({ limit, skip: skip + limit });
    }),
    tap(newSettings => this.settingSubject.next(newSettings))
  );
  /// par consequent on ajoute ngOnInit fromEvent
  */
}
