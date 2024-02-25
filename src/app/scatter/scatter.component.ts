import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface ScatterParams {
  delay: number;
  duration: number;
  x: number;
  y: number;
  rotation: number;
}

interface ScatterTrigger {
  params: ScatterParams;
  value: boolean;
}

@Component({
  selector: 'cv-scatter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scatter.component.html',
  styleUrl: './scatter.component.scss',
  animations: [
    trigger('scatter', [
      state(
        'true',
        style({
          transform: 'translate({{ x }}%, {{ y }}%) rotate({{ rotation }}turn)',
        }),
        { params: { rotation: 0, x: 0, y: 0 } }
      ),
      transition(
        '* => *',
        [animate('{{ duration }}ms {{ delay }}ms ease-in-out')],
        { params: { delay: 0, duration: 1000 } }
      ),
    ]),
  ],
})
export class ScatterComponent {
  @Input() delay = 0;
  @Input() duration = 1000;
  @HostBinding('style.height') @Input() height = '100%';
  @Input() maxX = 80;
  @Input() maxY = 80;
  @HostBinding('@scatter') scatter: ScatterTrigger = {
    params: this._generateParams(),
    value: false,
  };
  @Output() scatterDone = new EventEmitter<AnimationEvent>();
  @Input() set scattered(value: boolean) {
    let params = this.scatter.params;
    if (!this.scatter.value) params = this._generateParams();
    this.scatter = { params, value };
  }
  @HostBinding('style.width') @Input() width = '100%';

  private _generateParams(): ScatterParams {
    const maxX = this.maxX;
    const maxY = this.maxY;
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    const rotation =
      this._getRotationFactor([maxX, maxY], [x, y]) *
      ((x > 0 && y > 0) || (x < 0 && y < 0) ? -0.25 : 0.25);
    return { delay: this.delay, duration: this.duration, rotation, x, y };
  }

  private _getRotationFactor(
    [maxX, maxY]: [number, number],
    [x, y]: [number, number]
  ): number {
    x = Math.abs(x) / maxX;
    y = Math.abs(y) / maxY;
    return x > 0 ? (x - y + 1) / 2 : 0;
  }

  @HostListener('@scatter.done', ['$event']) onScatterDone(
    event: AnimationEvent
  ) {
    this.scatterDone.emit(event);
  }
}
