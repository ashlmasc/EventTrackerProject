package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Workout;

public interface WorkoutService {
	
	Workout findById(int id);
	
	List<Workout> findAll();
	
	Workout create(Workout workout);
	
	Workout update(Workout workout, int workoutId);
	
	void delete(int workoutId);
}
