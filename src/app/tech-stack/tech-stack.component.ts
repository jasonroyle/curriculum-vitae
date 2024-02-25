import { AnimationEvent } from '@angular/animations';
import { Component } from '@angular/core';
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
  private readonly _techStack: Tech[] = [
    { name: 'Angular', img: '/assets/images/angular.svg' },
    { name: 'Ansible', img: '/assets/images/ansible.svg' },
    { name: 'Apache HTTP Server', img: '/assets/images/apache.svg' },
    { name: 'CakePHP', img: '/assets/images/cakephp.png' },
    { name: 'HTML', img: '/assets/images/html.svg' },
    { name: 'Li3', img: '/assets/images/li3.png' },
    { name: 'MongoDB', img: '/assets/images/mongodb.png' },
    { name: 'MySQL', img: '/assets/images/mysql.png' },
    { name: 'NGINX', img: '/assets/images/nginx.svg' },
    { name: 'Node.js', img: '/assets/images/nodejs.png' },
    { name: 'PHP', img: '/assets/images/php.png' },
    { name: 'Python', img: '/assets/images/python.svg' },
    { name: 'RabbitMQ / AMQP', img: '/assets/images/rabbitmq.png' },
    { name: 'Sass', img: '/assets/images/sass.png' },
    { name: 'TypeScript', img: '/assets/images/typescript.svg' },
  ];
  scattered = true;
  techStack!: Tech[];

  constructor() {
    this.shuffle();
  }

  onScatterDone({ toState }: AnimationEvent): void {
    if (!toState) {
      this._scatterDoneCounter++;
      if (this._scatterDoneCounter === this._techStack.length) {
        this._scatterDoneCounter = 0;
        this.shuffle();
        this.scattered = true;
      }
    }
  }

  replay(): void {
    this.scattered = false;
  }

  shuffle() {
    this.techStack = this._techStack
      .map((value) => ({ order: Math.random(), value }))
      .sort((a, b) => a.order - b.order)
      .map(({ value }) => value);
  }
}
