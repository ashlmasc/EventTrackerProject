package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Workout;
import com.skilldistillery.eventtracker.repositories.WorkoutRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class WorkoutServiceImpl implements WorkoutService {
	
	private WorkoutRepository workoutRepo;

	public WorkoutServiceImpl(WorkoutRepository workoutRepo) {
		this.workoutRepo = workoutRepo;
	}

	@Override
	public Workout findById(int id) {
		Optional<Workout> result = workoutRepo.findById(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new EntityNotFoundException("Workout not found with id: " + id);
        }
	}

	@Override
	public List<Workout> findAll() {
		return workoutRepo.findAll();
	}

	@Override
	public Workout create(Workout workout) {
		 return workoutRepo.saveAndFlush(workout);
	}

	@Override
	public Workout update(Workout workout, int workoutId) {
		 Optional<Workout> workoutOptional = workoutRepo.findById(workoutId);
	        if (workoutOptional.isPresent()) {
	            workout.setId(workoutId);
	            return workoutRepo.saveAndFlush(workout);
	        }
	        return null;
	    }

	@Override
	public void delete(int workoutId) {
		workoutRepo.deleteById(workoutId);		
	}
}