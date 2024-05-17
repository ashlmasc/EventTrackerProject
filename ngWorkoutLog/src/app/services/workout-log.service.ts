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

  getEvents(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

}
