import { Directive, Input, TemplateRef } from '@angular/core';

import { StackItem } from './stack-item';

@Directive({
  selector: '[cvStack]',
  standalone: true,
  exportAs: 'cvStack',
})
export class StackDirective extends StackItem {
  @Input() parallaxEnabled = false;
  @Input() transitionDelay = 0;
  @Input() transitionDuration = 100;

  constructor(public templeteRef: TemplateRef<unknown>) {
    super();
  }
}
