import { Component, OnInit } from '@angular/core';
import { WorkoutLogService } from '../../services/workout-log.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit {

  workouts: any[] = [];

  constructor(private workoutLogService: WorkoutLogService) { }

  
  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutLogService.getEvents().subscribe({
      next: (data) => {
        console.log(data); // Check what data is being received
        this.workouts = data;
      },
      error: (err) => console.error('Failed to fetch workouts', err),
      complete: () => console.log('Workouts fetched successfully.')
    });
  }
}
