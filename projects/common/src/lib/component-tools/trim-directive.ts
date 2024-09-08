import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input:not([no-trim])',
})
export class TrimDirective {
  constructor(
    private ngControl: NgControl,
    private el: ElementRef,
  ) {}

  @HostListener('blur', ['$event.target'])
  onBlur(input: HTMLInputElement) {
    const types = ['password', 'text', 'email'];
    if (types.includes(input.type)) {
      const trimmedValue = input.value.trim();
      if (trimmedValue !== input.value) {
        this.ngControl.control?.setValue(trimmedValue);
      }
    }
  }
}
