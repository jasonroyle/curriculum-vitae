import { Directive, Input } from '@angular/core';

/**
 * Common properties for stack item related components.
 */
@Directive()
export abstract class StackItem {
  /**
   * The sum of `zIndex` and `zIndexModifier`.
   */
  get modifiedZIndex(): number {
    // console.log({ zIndex: this.zIndex, modifier: this.zIndexModifier });
    return this.zIndex + this.zIndexModifier;
  }

  /**
   * Indicates the display order on the z-axis.
   */
  @Input() zIndex = 0;

  /**
   * The sum of the lowest `zIndex` and `zIndexModifier` should be 0.
   */
  @Input() zIndexModifier = 0;
}
