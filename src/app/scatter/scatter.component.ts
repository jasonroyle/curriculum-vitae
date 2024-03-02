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
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface OriginParams {
  originOffset: number;
}

interface ParallaxParams {
  y: number;
}

interface ParallaxTrigger {
  params?: ParallaxParams;
  value: number;
}

interface ScatterParams {
  delay: number;
  duration: number;
  rotation: number;
  x: number;
  y: number;
}

type ScatterState = 'origin' | 'scatter';

interface ScatterTrigger {
  params?: OriginParams & ScatterParams;
  value: ScatterState;
}

@Component({
  selector: 'cv-scatter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scatter.component.html',
  styleUrl: './scatter.component.scss',
  animations: [
    trigger('parallax', [
      transition(':decrement', []),
      transition(':increment', []),
    ]),
    trigger('scatter', [
      state(
        'origin',
        style({
          transform: 'translate({{ originOffset }}rem, {{ originOffset }}rem)',
        }),
        { params: { originOffset: 0 } }
      ),
      state(
        'scatter',
        style({
          transform: 'translate({{ x }}%, {{ y }}%) rotate({{ rotation }}turn)',
        }),
        { params: { rotation: 0, x: 0, y: 0 } }
      ),
      transition('* => origin', [animate('{{ duration }}ms ease-in-out')], {
        params: { duration: 1000 },
      }),
      transition(
        '* => scatter',
        [animate('{{ duration }}ms {{ delay }}ms ease-in-out')],
        { params: { delay: 0, duration: 1000 } }
      ),
    ]),
  ],
})
export class ScatterComponent implements OnInit {
  private _scattered = false;
  @Input() delayMultiplier = 50;
  @Input() duration = 1000;
  @HostBinding('style.height') @Input() height = '100%';
  @Input() maxRotation = 0.25;
  @Input() maxX = 100;
  @Input() maxY = 100;
  @Input() originOffsetMultiplier = 1;
  @HostBinding('@parallax') parallax: ParallaxTrigger = {
    value: 0,
  };
  @HostBinding('@scatter') scatter: ScatterTrigger = {
    value: 'origin',
  };
  @Output() scatterDone = new EventEmitter<AnimationEvent>();
  get scatterState(): ScatterState {
    return this._scattered ? 'scatter' : 'origin';
  }
  get scattered(): boolean {
    return this._scattered;
  }
  @Input() set scattered(scattered: boolean) {
    this._scattered = scattered;
    let params = this.scatter.params;
    if (!params) return;
    if (this.scatter.value === 'origin')
      params = { ...params, ...this._generateScatterParams() };
    if (this.scatter.value === 'scatter')
      params = { ...params, ...this._generateOriginParams() };
    this.scatter = { params, value: this.scatterState };
  }
  @Input() stackCount = 0;
  @HostBinding('style.width') @Input() width = '100%';
  @Input() zIndex = 0;
  @Input() zIndexModifier = 0;

  private _generateOriginParams(): OriginParams {
    const originOffset =
      ((this.zIndex + this.zIndexModifier) / (this.stackCount - 1) - 0.5) *
      this.originOffsetMultiplier;
    return { originOffset };
  }

  private _generateScatterParams(): ScatterParams {
    const maxRotation = this.maxRotation;
    const maxX = this.maxX;
    const maxY = this.maxY;
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    const rotation =
      this._getRotationFactor([maxX, maxY], [x, y]) *
      ((x > 0 && y > 0) || (x < 0 && y < 0) ? -maxRotation : maxRotation);
    return {
      delay: this.zIndex * this.delayMultiplier,
      duration: this.duration,
      rotation,
      x,
      y,
    };
  }

  private _getRotationFactor(
    [maxX, maxY]: [number, number],
    [x, y]: [number, number]
  ): number {
    x = Math.abs(x) / maxX;
    y = Math.abs(y) / maxY;
    return x > 0 ? (x - y + 1) / 2 : 0;
  }

  ngOnInit(): void {
    this.scatter = {
      value: this.scatterState,
      params: {
        ...this._generateOriginParams(),
        ...this._generateScatterParams(),
      },
    };
  }

  @HostListener('@scatter.done', ['$event']) onScatterDone(
    event: AnimationEvent
  ) {
    this.scatterDone.emit(event);
  }
}
