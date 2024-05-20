import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDeleteComponent } from './workout-delete.component';

describe('WorkoutDeleteComponent', () => {
  let component: WorkoutDeleteComponent;
  let fixture: ComponentFixture<WorkoutDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
