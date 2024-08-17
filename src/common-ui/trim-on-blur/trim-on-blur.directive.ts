import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[type="text"]:not([no-trim]), input:not([type])',
})
export class TrimOnBlurDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('blur', ['$event.target.value'])
  onBlur(currentValue: string) {
    const value = currentValue.trim();
    this.ngControl.control?.patchValue(value);
  }
}
