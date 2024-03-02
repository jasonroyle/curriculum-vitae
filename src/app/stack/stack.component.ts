import {
  AnimationEvent,
  animate,
  animation,
  group,
  keyframes,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { StackDirective } from './stack.directive';

const shuffleAnimation = animation([
  animate(
    '{{ duration }}ms {{ delay }}ms ease-in-out',
    keyframes([
      style({ offset: 0, transform: 'translate(0, 0) rotate(0deg)' }),
      style({
        offset: 0.25,
        transform:
          'translate({{ x }}rem, {{ y }}rem) rotate({{ rotation }}deg)',
      }),
      style({
        offset: 0.75,
        transform:
          'translate({{ x }}rem, {{ y }}rem) rotate({{ rotation }}deg)',
      }),
      style({ offset: 1, transform: 'translate(0, 0) rotate(0deg)' }),
    ])
  ),
]);

@Component({
  selector: 'cv-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
  animations: [
    trigger('shuffle', [
      transition('* => true', [
        group([
          animate('1s linear'),
          query(
            '.cv-stack-even',
            sequence([
              stagger(
                -100,
                useAnimation(shuffleAnimation, {
                  params: {
                    delay: 0,
                    duration: 1000,
                    rotation: 15,
                    x: 6,
                    y: 1,
                  },
                })
              ),
            ])
          ),
          query(
            '.cv-stack-odd',
            sequence([
              stagger(
                100,
                useAnimation(shuffleAnimation, {
                  params: {
                    delay: 50,
                    duration: 1000,
                    rotation: -15,
                    x: -6,
                    y: -1,
                  },
                })
              ),
            ])
          ),
        ]),
      ]),
    ]),
  ],
})
export class StackComponent {
  @HostBinding('style.height') @Input() height = '100%';
  @Input() parallaxMultiplier = 0;
  @HostBinding('@shuffle') @Input() shuffle = false;
  @Output() shuffleDone = new EventEmitter<AnimationEvent>();
  @ContentChildren(StackDirective) stack!: QueryList<StackDirective>;
  @HostBinding('style.width') @Input() width = '100%';

  @HostListener('@shuffle.done', ['$event']) onShuffleDone(
    event: AnimationEvent
  ) {
    this.shuffleDone.emit(event);
  }
}
