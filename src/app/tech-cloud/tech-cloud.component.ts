import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnimationMetadata,
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface Tech {
  name: string;
  img: string;
}

const tech: Tech[] = [
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

function rotationFactor(
  [maxX, maxY]: [number, number],
  [x, y]: [number, number]
): number {
  x = Math.abs(x) / maxX;
  y = Math.abs(y) / maxY;
  return x > 0 ? (x - y + 1) / 2 : 0;
}

function animateScatter(count: number): AnimationMetadata[] {
  const animation: AnimationMetadata[] = [];
  for (let i = 0; i < count; i++) {
    const max: [number, number] = [15, 40];
    const [maxX, maxY] = max;
    const x = Math.random() * (maxX * 2) - maxX;
    const y = Math.random() * (maxY * 2) - maxY;
    const rotation =
      rotationFactor(max, [x, y]) *
      ((x > 0 && y > 0) || (x < 0 && y < 0) ? -0.25 : 0.25);
    animation.push(
      query(
        `.scatter-${i}`,
        animate(
          '1.2s {{ delay }}ms ease-in-out',
          style({
            transform:
              'translate({{ x }}%, {{ y }}%) rotate({{ rotation }}turn)',
          })
        ),
        {
          params: { delay: 50 * i, rotation, x, y },
        }
      )
    );
  }
  return animation;
}

@Component({
  selector: 'cv-tech-cloud',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('stackScatter', [
      transition('stack <=> scatter', group(animateScatter(tech.length))),
    ]),
  ],
  templateUrl: './tech-cloud.component.html',
  styleUrl: './tech-cloud.component.scss',
})
export class TechCloudComponent implements AfterViewInit {
  @HostBinding('@stackScatter') get stackScatter(): 'stack' | 'scatter' {
    return this.scatter ? 'scatter' : 'stack';
  }
  scatter = false;
  tech: Tech[] = tech
    .map((value) => ({ order: Math.random(), value }))
    .sort((a, b) => a.order - b.order)
    .map(({ value }) => value);

  ngAfterViewInit(): void {
    this.scatter = true;
    setInterval(() => (this.scatter = !this.scatter), 2000);
  }
}
