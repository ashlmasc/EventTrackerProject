import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutLogService {

private baseUrl = 'http://localhost:8084/'; // adjust port to match server
private url = this.baseUrl + 'api/workouts'; // change 'todos' to your API path

  constructor(private httpClient: HttpClient) { }

  // Retrieve all workouts
  getEvents(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

  // Retrieve a single workout by id
    getWorkoutById(id: number): Observable<any> {
      return this.httpClient.get(`${this.url}/${id}`);
    }
  
    // Create a new workout
    createWorkout(workout: any): Observable<any> {
      return this.httpClient.post(this.url, workout);
    }
  
    // Update an existing workout
    updateWorkout(id: number, workout: any): Observable<any> {
      return this.httpClient.put(`${this.url}/${id}`, workout);
    }
  
    // Delete a workout
    deleteWorkout(id: number): Observable<any> {
      return this.httpClient.delete(`${this.url}/${id}`);
    }

}
