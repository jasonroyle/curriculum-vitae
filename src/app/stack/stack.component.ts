import {
  AnimationEvent,
  animate,
  animation,
  group,
  keyframes,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  AfterViewInit,
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
    trigger('shuffleInOut', [
      state('in', style({ opacity: '1' })),
      state('void', style({ opacity: '0' })),
      transition(':leave', animate('1s linear')),
      transition('* => in', [
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
                    duration: 2000,
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
                    duration: 2000,
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
export class StackComponent implements AfterViewInit {
  @HostBinding('style.height') @Input() height = '100%';
  @HostBinding('@shuffleInOut') shuffleInOut: 'in' | 'void' = 'void';
  @Output() shuffleInOutDone = new EventEmitter<AnimationEvent>();
  @ContentChildren(StackDirective) stack!: QueryList<StackDirective>;
  @HostBinding('style.width') @Input() width = '100%';

  ngAfterViewInit(): void {
    setTimeout(() => (this.shuffleInOut = 'in'), 500);
  }

  @HostListener('@shuffleInOut.done', ['$event']) onShuffleInOutDone(
    event: AnimationEvent
  ) {
    this.shuffleInOutDone.emit(event);
  }
}
