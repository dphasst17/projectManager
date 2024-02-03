import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewTaskComponent } from './staff-view-task.component';

describe('StaffViewTaskComponent', () => {
  let component: StaffViewTaskComponent;
  let fixture: ComponentFixture<StaffViewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffViewTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
