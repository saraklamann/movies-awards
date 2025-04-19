import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxIntervalTableComponent } from './max-interval-table.component';

describe('MaxIntervalTableComponent', () => {
  let component: MaxIntervalTableComponent;
  let fixture: ComponentFixture<MaxIntervalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxIntervalTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxIntervalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
