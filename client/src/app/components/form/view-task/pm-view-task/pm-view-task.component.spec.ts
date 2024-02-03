import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmViewTaskComponent } from './pm-view-task.component';

describe('PmViewTaskComponent', () => {
  let component: PmViewTaskComponent;
  let fixture: ComponentFixture<PmViewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmViewTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
