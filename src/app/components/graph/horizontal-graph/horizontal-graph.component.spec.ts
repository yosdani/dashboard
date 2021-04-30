import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalGraphComponent } from './horizontal-graph.component';

describe('HorizontalGraphComponent', () => {
  let component: HorizontalGraphComponent;
  let fixture: ComponentFixture<HorizontalGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
