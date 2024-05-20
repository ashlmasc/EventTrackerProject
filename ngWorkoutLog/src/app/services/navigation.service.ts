import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}

  navigateToAddWorkout() {
    this.router.navigate(['/workouts/add']);
  }

  navigateToEditWorkout(workoutId: number) {
    this.router.navigate(['/workouts/edit', workoutId]);
  }

  navigateToList() {
    this.router.navigate(['/workouts']);
  }

  navigateToDeleteWorkout(workoutId: number) {
    this.router.navigate(['/workouts/delete', workoutId]);
  }
}
