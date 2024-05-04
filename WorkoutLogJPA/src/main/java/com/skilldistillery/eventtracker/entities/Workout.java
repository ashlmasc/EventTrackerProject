package com.skilldistillery.eventtracker.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Workout {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private LocalDateTime date;
	
	private String type;
	
	private Integer duration;
	
	@Column(name="heart_rate_avg")
	private Integer heartRateAvg;
	
	@Column(name = "is_fasted")
	private boolean isFasted;
	
	@Column(name = "pre_workout_meal")
	private boolean preWorkoutMeal;
	
	@Column(name = "caffeine_consumed")
	private boolean caffeineConsumed;
	
	private String notes;

	public Workout() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}


	public Integer getHeartRateAvg() {
		return heartRateAvg;
	}

	public void setHeartRateAvg(Integer heartRateAvg) {
		this.heartRateAvg = heartRateAvg;
	}

	public boolean isFasted() {
		return isFasted;
	}

	public void setFasted(boolean isFasted) {
		this.isFasted = isFasted;
	}

	public boolean isPreWorkoutMeal() {
		return preWorkoutMeal;
	}

	public void setPreWorkoutMeal(boolean preWorkoutMeal) {
		this.preWorkoutMeal = preWorkoutMeal;
	}

	public boolean isCaffeineConsumed() {
		return caffeineConsumed;
	}

	public void setCaffeineConsumed(boolean caffeineConsumed) {
		this.caffeineConsumed = caffeineConsumed;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Workout other = (Workout) obj;
		return id == other.id;
	}
}
