package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

}
