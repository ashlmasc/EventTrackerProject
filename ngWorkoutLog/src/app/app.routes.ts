import { Routes } from '@angular/router';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutAddComponent } from './components/workout-add/workout-add.component';
import { WorkoutEditComponent } from './components/workout-edit/workout-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WorkoutDeleteComponent } from './components/workout-delete/workout-delete.component';

export const routes: Routes = [
    { path: '', redirectTo: '/workouts', pathMatch: 'full' },
    { path: 'workouts', component: WorkoutListComponent },
    { path: 'workouts/add', component: WorkoutAddComponent },
    { path: 'workouts/edit/:id', component: WorkoutEditComponent },
    { path: 'workouts/delete/:id', component: WorkoutDeleteComponent },
    { path: '**', component: NotFoundComponent }
];