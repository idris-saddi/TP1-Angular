import { Directive } from '@angular/core';
import { ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appRainbow]',
  standalone: true,
})
export class RainbowDirective {
  private colors: String[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];

  constructor() {}
  @HostBinding('style.color') textColor: String = this.colors[0];
  @HostBinding('style.borderColor') borderColor: String = this.colors[0];

  ngOnInit() {
    this.borderColor = this.colors[0];
    this.textColor = this.colors[0];
  }

  // Change color each time a key is pressed
  @HostListener('keyup') onKeyUp() {
    const randomColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }
}
