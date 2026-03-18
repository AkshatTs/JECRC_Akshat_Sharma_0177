import { Directive, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme!: string;

  constructor(private renderer: Renderer2) {}

  ngOnChanges() {

    if (this.appTheme === 'dark') {
      this.renderer.setStyle(document.body, 'backgroundColor', '#222');
      this.renderer.setStyle(document.body, 'color', '#fff');
    } 
    else {
      this.renderer.setStyle(document.body, 'backgroundColor', '#fff');
      this.renderer.setStyle(document.body, 'color', '#000');
    }
  }
}