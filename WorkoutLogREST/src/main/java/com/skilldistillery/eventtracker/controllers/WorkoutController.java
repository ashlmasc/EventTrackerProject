package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Workout;
import com.skilldistillery.eventtracker.services.WorkoutService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("/api")
public class WorkoutController {

	private WorkoutService workoutService;

	public WorkoutController(WorkoutService workoutService) {
		this.workoutService = workoutService;
		}

	@GetMapping("ping")
	public String ping() {
		return "pong";
	}

	// tested and works: http://localhost:8084/api/workouts
	@GetMapping({"workouts", "workouts/"})
	public List<Workout> getAllWorkouts() {
		return workoutService.findAll();
	}

	// tested and works: http://localhost:8084/api/workouts/1
	@GetMapping({ "workouts/{id}", "workouts/{id}/" })
	public Workout getWorkoutById(@PathVariable("id") int id) {
		return workoutService.findById(id);
	}
	
	// tested and works: http://localhost:8084/api/workouts
	@PostMapping({"workouts", "workouts/"})
    public Workout createWorkout(@RequestBody Workout workout) {
        return workoutService.create(workout);
    }
	
	// tested and works: http://localhost:8084/api/workouts/4
	@PutMapping({ "workouts/{id}", "workouts/{id}/" })
    public Workout updateWorkout(@PathVariable("id") int id, @RequestBody Workout workout) {
        return workoutService.update(workout, id);
    }
	
	// tested and works: http://localhost:8084/api/workouts/4
	@DeleteMapping({ "workouts/{id}", "workouts/{id}/" })
    public void deleteWorkout(@PathVariable("id") int id) {
        workoutService.delete(id);
    }
}
