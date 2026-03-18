import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}
  //Mouse enters -> apply highlight
  @HostListener('mouseenter')
  onMouseEnter(){
    this.el.nativeElement.style.backgroundColor = 'PaleTurquoise';
  }

  //Mouse leaves -> remove Highlight
  @HostListener('mouseleave')
  onMouseLeave(){
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }
}
