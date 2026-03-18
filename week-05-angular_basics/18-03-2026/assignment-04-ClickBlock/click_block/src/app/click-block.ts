import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective {

  @Input() appClickBlock!: boolean;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    if (!this.appClickBlock) {
      event.preventDefault();
      event.stopPropagation();
      alert('Action Blocked!');
    }
  }
}