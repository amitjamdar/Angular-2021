import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNotFoundComponent } from './display-not-found.component';

describe('DisplayNotFoundComponent', () => {
  let component: DisplayNotFoundComponent;
  let fixture: ComponentFixture<DisplayNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
