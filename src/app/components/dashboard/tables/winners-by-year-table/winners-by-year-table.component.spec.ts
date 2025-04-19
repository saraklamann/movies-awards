import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersByYearTableComponent } from './winners-by-year-table.component';

describe('WinnersByYearTableComponent', () => {
  let component: WinnersByYearTableComponent;
  let fixture: ComponentFixture<WinnersByYearTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnersByYearTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnersByYearTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
