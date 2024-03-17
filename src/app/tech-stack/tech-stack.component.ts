import { AnimationEvent } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import {
  BehaviorSubject,
  connectable,
  delay,
  distinctUntilChanged,
  tap,
} from 'rxjs';

import { ScatterComponent } from '../scatter/scatter.component';
import { StackComponent } from '../stack/stack.component';
import { StackDirective } from '../stack/stack.directive';

interface Tech {
  name: string;
  img: string;
}

@Component({
  selector: 'cv-tech-stack',
  standalone: true,
  imports: [CommonModule, ScatterComponent, StackComponent, StackDirective],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent implements AfterViewInit {
  private _scatterDoneCounter = 0;
  private _scattered$ = new BehaviorSubject(false);
  @ViewChildren(StackDirective)
  private _stackDirectives!: QueryList<StackDirective>;
  private readonly _techStack: Tech[] = [
    { name: 'Angular', img: '/assets/tech/angular.svg' },
    { name: 'Ansible', img: '/assets/tech/ansible.svg' },
    { name: 'Apache HTTP Server', img: '/assets/tech/apache.svg' },
    { name: 'CakePHP', img: '/assets/tech/cakephp.png' },
    { name: 'HTML', img: '/assets/tech/html.svg' },
    { name: 'Li3', img: '/assets/tech/li3.png' },
    { name: 'MongoDB', img: '/assets/tech/mongodb.svg' },
    { name: 'MySQL', img: '/assets/tech/mysql.png' },
    { name: 'NGINX', img: '/assets/tech/nginx.svg' },
    { name: 'Node.js', img: '/assets/tech/nodejs.png' },
    { name: 'PHP', img: '/assets/tech/php.png' },
    { name: 'Python', img: '/assets/tech/python.svg' },
    { name: 'RabbitMQ / AMQP', img: '/assets/tech/rabbitmq.png' },
    { name: 'Sass', img: '/assets/tech/sass.png' },
    { name: 'TypeScript', img: '/assets/tech/typescript.svg' },
  ];
  private _zIndex = 0;
  delayMultiplier = 50;
  duration = 800;
  parallaxXMultiplier = 0;
  parallaxYMultiplier = 0;
  scattered$ = connectable(
    this._scattered$.asObservable().pipe(
      delay(0),
      distinctUntilChanged(),
      tap((scattered) => {
        console.log({ scattered });
        // When scattering
        if (scattered) {
          // Reset scatter done counter
          this._scatterDoneCounter = 0;

          this._zIndex = this._techStack.length;
          // Set z-index of each stack item below 0
          this._stackDirectives.forEach((stackDirective) => {
            console.log('UPDATING', stackDirective);
            stackDirective.zIndex =
              stackDirective.zIndex - this._techStack.length;
            stackDirective.zIndexModifier =
              this._techStack.length - stackDirective.zIndex;
          });
        }
      })
    )
  );
  techStack: Tech[];

  constructor(private _viewportScroller: ViewportScroller) {
    this._zIndex = this._techStack.length;
    this.techStack = this._techStack
      .map((value) => ({ order: Math.random(), value }))
      .sort((a, b) => a.order - b.order)
      .map(({ value }) => value);
  }

  ngAfterViewInit(): void {
    this.scattered$.connect();
  }

  onScatterClick(
    scatterComponent: ScatterComponent,
    stackDirective: StackDirective
  ): void {
    if (!scatterComponent.scattered) return;
    stackDirective.transitionDelay = 0;
    stackDirective.transitionDuration = this.duration;
    stackDirective.zIndex = this._zIndex;
    stackDirective.zIndexModifier = -this._zIndex;
    scatterComponent.zIndex = this._zIndex;
    scatterComponent.zIndexModifier = 0;
    scatterComponent.scattered = false;
    this._zIndex++;
  }

  onScatterDone(
    { fromState, toState }: AnimationEvent,
    stackDirective: StackDirective
  ): void {
    console.log('SCATTER DONE', { fromState, toState });
    if (toState === 'origin') {
      stackDirective.transitionDelay = 0;
      stackDirective.transitionDuration = 20;
    }
    if (toState === 'scatter') {
      stackDirective.transitionDelay = 0;
      stackDirective.transitionDuration = 20;
      stackDirective.zIndexModifier = this._techStack.length;
    }
    if (fromState === 'scatter' && toState === 'origin') {
      this._scatterDoneCounter++;
      if (this._scatterDoneCounter === this._techStack.length) {
        this._scatterDoneCounter = 0;
        this._scattered$.next(false);
        this._scattered$.next(true);
      }
    }
    if (fromState === 'void' && toState === 'origin') {
      this._scatterDoneCounter++;
      if (this._scatterDoneCounter === this._techStack.length) {
        this._scatterDoneCounter = 0;
        this._scattered$.next(true);
      }
    }
  }

  onScatterStart(
    { toState }: AnimationEvent,
    index: number,
    stackDirective: StackDirective
  ): void {
    if (toState === 'scatter') {
      stackDirective.transitionDelay = index * this.delayMultiplier;
      stackDirective.transitionDuration = this.duration;
      stackDirective.zIndexModifier = 0;
    }
  }

  @HostListener('window:scroll') onScroll(): void {
    const scrollPosition = this._viewportScroller.getScrollPosition();
    this.parallaxXMultiplier = scrollPosition[0] / 3;
    this.parallaxYMultiplier = scrollPosition[1] / 3;
  }
}
