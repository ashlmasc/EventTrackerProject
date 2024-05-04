package com.skilldistillery.eventtracker.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.services.WorkoutService;

@RestController
@RequestMapping("api")
public class WorkoutController {
	
	private WorkoutService workoutService;

	public WorkoutController(WorkoutService workoutService) {
		this.workoutService = workoutService;
	}
	
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
}
