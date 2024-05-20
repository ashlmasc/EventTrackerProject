import { Component } from '@angular/core';
import { WorkoutLogService } from '../../services/workout-log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-edit.component.html',
  styleUrl: './workout-edit.component.css'
})
export class WorkoutEditComponent {
  workout: any = {
    date: '',
    type: '',
    duration: 0,
    heartRateAvg: 0,
    isFasted: false,
    preWorkoutMeal: false,
    caffeineConsumed: false,
    notes: ''
  };  // Initialize with default values
  id: number | undefined;

  constructor(
    private workoutLogService: WorkoutLogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;  // Convert to number
        this.workoutLogService.getWorkoutById(this.id).subscribe({
          next: (data) => {
            if (data) {
              this.workout = { ...this.workout, ...data };  // Merge fetched data with default values
              this.workout.isFasted = data.isFasted;  // Explicitly set the boolean since having issues otherwise; still not working and not sure why
              this.workout.durationDisplay = this.convertSecondsToDuration(this.workout.duration);
            } else {
              this.router.navigateByUrl('/not-found');
            }
          },
          error: () => this.router.navigateByUrl('/not-found')
        });
      }
    });
  }

  updateWorkout(): void {
    console.log('Updating workout with data:', this.workout);  // Debug log
    this.workout.duration = this.convertDurationToSeconds(this.workout.durationDisplay); // Convert back to seconds
    if (this.id && this.workout) {
      this.workoutLogService.updateWorkout(this.id, this.workout).subscribe({
        next: () => this.router.navigate(['/workouts']),
        error: (err) => {
          console.error('Failed to update workout:', err);
          alert('Error updating workout.');
        }
      });
    } else {
      alert('Invalid ID or workout data.');
    }
  }
  
  convertDurationToSeconds(duration: string): number {
    const parts = duration.split(':');
    return parts.length === 2 ? parseInt(parts[0]) * 60 + parseInt(parts[1]) : 0;
  }

  convertSecondsToDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }
}