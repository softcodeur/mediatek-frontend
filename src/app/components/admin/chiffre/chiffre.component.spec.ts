import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreComponent } from './chiffre.component';

describe('ChiffreComponent', () => {
  let component: ChiffreComponent;
  let fixture: ComponentFixture<ChiffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
