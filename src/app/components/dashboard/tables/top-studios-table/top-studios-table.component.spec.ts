import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudiosTableComponent } from './top-studios-table.component';

describe('TopStudiosTableComponent', () => {
  let component: TopStudiosTableComponent;
  let fixture: ComponentFixture<TopStudiosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStudiosTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStudiosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
