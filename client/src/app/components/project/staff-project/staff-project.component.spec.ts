import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProjectComponent } from './staff-project.component';

describe('StaffProjectComponent', () => {
  let component: StaffProjectComponent;
  let fixture: ComponentFixture<StaffProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
