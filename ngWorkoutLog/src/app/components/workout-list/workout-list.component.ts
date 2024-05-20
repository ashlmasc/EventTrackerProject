import { Component, OnInit } from '@angular/core';
import { WorkoutLogService } from '../../services/workout-log.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router'
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit {

  workouts: any[] = [];

  constructor(private workoutLogService: WorkoutLogService,  private router: Router, route: ActivatedRoute, private navigationService: NavigationService) { }

  
  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutLogService.getEvents().subscribe({
      next: (data) => {
        this.workouts = data.map((workout: { duration: number; }) => ({
          ...workout,
          durationDisplay: this.convertSecondsToDuration(workout.duration)
        }));
      },
      error: (err) => console.error('Failed to fetch workouts', err)
    });
  }

  convertSecondsToDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }

  confirmDelete(workoutId: number): void {
    if (confirm('Are you sure you want to delete this workout?')) {
      this.deleteWorkout(workoutId);
    }
  }

  deleteWorkout(workoutId: number): void {
    this.workoutLogService.deleteWorkout(workoutId).subscribe({
      next: () => {
        console.log('Workout deleted successfully.');
        this.workouts = this.workouts.filter(workout => workout.id !== workoutId);
      },
      error: (err) => console.error('Failed to delete workout', err)
    });
  }
}