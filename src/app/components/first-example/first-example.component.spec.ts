import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstExampleComponent } from './first-example.component';

describe('FirstExampleComponent', () => {
  let component: FirstExampleComponent;
  let fixture: ComponentFixture<FirstExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
