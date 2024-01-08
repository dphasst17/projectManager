import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderComponentComponent } from './leader-component.component';

describe('LeaderComponentComponent', () => {
  let component: LeaderComponentComponent;
  let fixture: ComponentFixture<LeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
