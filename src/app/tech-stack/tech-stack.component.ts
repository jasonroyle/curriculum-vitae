import { AnimationEvent } from '@angular/animations';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @ViewChildren(StackDirective)
  private _stackDirectives!: QueryList<StackDirective>;
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
  private _zIndex: number;
  scattered = false;
  shuffle = false;
  techStack: Tech[];

  constructor() {
    this._zIndex = this._techStack.length;
    this.techStack = this._techStack
      .map((value) => ({ order: Math.random(), value }))
      .sort((a, b) => a.order - b.order)
      .map(({ value }) => value);
  }

  onScatterClick(scatter: ScatterComponent, stack: StackDirective): void {
    stack.zIndex = this._zIndex;
    scatter.zIndex = this._zIndex;
    scatter.scattered = false;
    this._zIndex++;
  }

  onScatterDone({ fromState, toState }: AnimationEvent): void {
    if (fromState === 'scatter' && toState === 'origin') {
      this._scatterDoneCounter++;
      if (this._scatterDoneCounter === this._techStack.length) {
        this._scatterDoneCounter = 0;
        this._zIndex = this._techStack.length;
        this._stackDirectives.forEach(
          (stackDirective) =>
            (stackDirective.zIndex =
              stackDirective.zIndex - this._techStack.length)
        );
        this.scattered = false;
        this.shuffle = true;
      }
    }
    if (fromState === 'void' && toState === 'origin') {
      this.shuffle = true;
    }
  }

  onShuffleDone({ toState }: AnimationEvent): void {
    if (toState) {
      this.shuffle = false;
      this.scattered = true;
    }
  }
}
