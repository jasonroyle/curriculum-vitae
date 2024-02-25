import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cvStack]',
  standalone: true,
})
export class StackDirective {
  constructor(public templeteRef: TemplateRef<unknown>) {}
}
