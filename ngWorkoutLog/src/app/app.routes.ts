import { Routes } from '@angular/router';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

export const routes: Routes = [
    { path: 'workouts', component: WorkoutListComponent }
    //{ path: '**', component: NotFoundComponent }  // Wildcard route
];
