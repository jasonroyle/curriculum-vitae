import { AnimationEvent } from '@angular/animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, delay } from 'rxjs';

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
export class TechStackComponent {
  private _scatterDoneCounter = 0;
  private readonly _scattered$ = new BehaviorSubject<boolean>(false);
  private readonly _techStack: Tech[] = [
    { name: 'Angular', img: '/assets/tech/angular.svg' },
    { name: 'Ansible', img: '/assets/tech/ansible.svg' },
    { name: 'Apache HTTP Server', img: '/assets/tech/apache.svg' },
    { name: 'CakePHP', img: '/assets/tech/cakephp.png' },
    { name: 'HTML', img: '/assets/tech/html.svg' },
    { name: 'Li3', img: '/assets/tech/li3.png' },
    { name: 'MongoDB', img: '/assets/tech/mongodb.png' },
    { name: 'MySQL', img: '/assets/tech/mysql.png' },
    { name: 'NGINX', img: '/assets/tech/nginx.svg' },
    { name: 'Node.js', img: '/assets/tech/nodejs.png' },
    { name: 'PHP', img: '/assets/tech/php.png' },
    { name: 'Python', img: '/assets/tech/python.svg' },
    { name: 'RabbitMQ / AMQP', img: '/assets/tech/rabbitmq.png' },
    { name: 'Sass', img: '/assets/tech/sass.png' },
    { name: 'TypeScript', img: '/assets/tech/typescript.svg' },
  ];
  readonly scattered$ = this._scattered$.asObservable().pipe(delay(0));
  techStack!: Tech[];

  constructor() {
    this.shuffle();
  }

  private _shuffle(): Tech[] {
    return this._techStack
      .map((value) => ({ order: Math.random(), value }))
      .sort((a, b) => a.order - b.order)
      .map(({ value }) => value);
  }

  onShuffleInOutDone({ toState }: AnimationEvent): void {
    if (toState === 'in') this._scattered$.next(true);
  }

  onScatterDone({ fromState, toState }: AnimationEvent): void {
    if (fromState === 'scatter' && toState === 'origin') {
      this._scatterDoneCounter++;
      if (this._scatterDoneCounter === this._techStack.length) {
        this._scatterDoneCounter = 0;
        // this.shuffle();
        this._scattered$.next(false);
        this._scattered$.next(true);
      }
    }
  }

  // @HostListener('click') replay(): void {
  //   this.scattered = false;
  // }

  shuffle() {
    this.techStack = this._shuffle();
  }
}
