import { Component, inject, effect, signal } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
  standalone: true,
  imports: [ItemComponent],
})
export class EmbaucheComponent {
  private embaucheService = inject(EmbaucheService);

  // Reactive signal for the list of hired candidates
  public embauchees = this.embaucheService.getEmbauchees();

  constructor() {
    // Automatically update `embauchees` when the signal in the service changes
    effect(() => {
      this.embauchees = this.embaucheService.getEmbauchees();
    });
  }
}
