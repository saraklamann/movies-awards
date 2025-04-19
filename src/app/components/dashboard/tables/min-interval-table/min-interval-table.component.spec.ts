import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinIntervalTableComponent } from './min-interval-table.component';

describe('MinIntervalTableComponent', () => {
  let component: MinIntervalTableComponent;
  let fixture: ComponentFixture<MinIntervalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinIntervalTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinIntervalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
