import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {

  @Input() appHighlight!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlight >= 90) {
      this.el.nativeElement.style.backgroundColor = 'PaleTurquoise';
    }
  }
}