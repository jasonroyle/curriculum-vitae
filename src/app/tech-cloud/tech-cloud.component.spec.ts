import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechCloudComponent } from './tech-cloud.component';

describe('TechCloudComponent', () => {
  let component: TechCloudComponent;
  let fixture: ComponentFixture<TechCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechCloudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
