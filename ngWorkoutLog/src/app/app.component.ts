import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkoutEditComponent } from './components/workout-edit/workout-edit.component';
import { WorkoutAddComponent } from './components/workout-add/workout-add.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, 
    WorkoutListComponent, NavbarComponent, WorkoutEditComponent, WorkoutAddComponent, 
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngWorkoutLog';
}
