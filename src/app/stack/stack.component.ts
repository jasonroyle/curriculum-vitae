import {
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { StackDirective } from './stack.directive';

@Component({
  selector: 'cv-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
})
export class StackComponent {
  @ContentChildren(StackDirective) stack!: QueryList<StackDirective>;
  @HostBinding('style.height') @Input() height = '100%';
  @HostBinding('style.width') @Input() width = '100%';
}
