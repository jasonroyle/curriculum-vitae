import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cvStack]',
  standalone: true,
  exportAs: 'cvStack',
})
export class StackDirective {
  @Input() zIndex = 0;

  constructor(public templeteRef: TemplateRef<unknown>) {}
}
