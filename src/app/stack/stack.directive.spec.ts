import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackComponent } from './stack.component';
import { StackDirective } from './stack.directive';

@Component({
  template: `<cv-stack>
    <ng-template cvStack><p>One</p></ng-template>
    <ng-template cvStack><p>Two</p></ng-template>
  </cv-stack>`,
})
class TestComponent {}

describe('StackDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackComponent, StackDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
