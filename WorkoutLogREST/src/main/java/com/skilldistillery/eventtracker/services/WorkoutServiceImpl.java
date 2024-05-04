package com.skilldistillery.eventtracker.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Workout;
import com.skilldistillery.eventtracker.repositories.WorkoutRepository;

@Service
public class WorkoutServiceImpl implements WorkoutService {
	
	private WorkoutRepository workoutRepo;

	public WorkoutServiceImpl(WorkoutRepository workoutRepo) {
		super();
		this.workoutRepo = workoutRepo;
	}

	@Override
	public Workout findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Workout> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Workout create(Workout workout) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Workout update(Workout workout, int workoutId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(int workoutId) {
		// TODO Auto-generated method stub
		
	}
}
