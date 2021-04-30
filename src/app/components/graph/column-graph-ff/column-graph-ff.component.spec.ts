import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnGraphFfComponent } from './column-graph-ff.component';

describe('ColumnGraphFfComponent', () => {
  let component: ColumnGraphFfComponent;
  let fixture: ComponentFixture<ColumnGraphFfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnGraphFfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnGraphFfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
