import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ttccalculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ttc-calculator.component.html',
  styleUrl: './ttc-calculator.component.css',
})
export class TtcCalculatorComponent {
  price = signal<number>(0);
  quantity = signal<number>(1);
  tva = signal<number>(18);

  unitPrice = computed(() => {
    const rawUnitPrice = this.price() + (this.price() * this.tva()) / 100;
    return rawUnitPrice.toFixed(3);
  });

  totalPrice = computed(() => {
    const unitPrice = parseFloat(this.unitPrice());
    const disc = this.discount();
    const rawTotalPrice = this.quantity() * unitPrice * (1 - disc / 100);
    return rawTotalPrice.toFixed(3);
  });

  discount = computed(() => {
    if (this.quantity() > 15) return 30;
    if (this.quantity() > 10) return 20;
    return 0;
  });

  onTvaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tva.set(input.valueAsNumber || 0);
  }

  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.price.set(input.valueAsNumber || 0);
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.quantity.set(input.valueAsNumber || 0);
  }
}
