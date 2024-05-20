import { Component } from '@angular/core';
import { WorkoutLogService } from '../../services/workout-log.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workout-delete',
  standalone: true,
  imports: [],
  templateUrl: './workout-delete.component.html',
  styleUrl: './workout-delete.component.css'
})
export class WorkoutDeleteComponent {

  constructor(
    private workoutLogService: WorkoutLogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.confirmAndDelete();
  }

  confirmAndDelete(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (confirm('Are you sure you want to delete this workout?')) {
      if (id) {
        this.workoutLogService.deleteWorkout(+id).subscribe({
          next: () => {
            alert('Workout deleted successfully.');
            this.router.navigate(['/workouts']);
          },
          error: err => {
            alert('Failed to delete the workout.');
            console.error(err);
          }
        });
      } else {
        alert('Invalid workout ID.');
        this.router.navigate(['/workouts']);
      }
    } else {
      this.router.navigate(['/workouts']);  // Navigate back if cancelled
    }
  }
}