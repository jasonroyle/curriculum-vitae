import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoStackComponent } from './photo-stack.component';

describe('PhotoStackComponent', () => {
  let component: PhotoStackComponent;
  let fixture: ComponentFixture<PhotoStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoStackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
