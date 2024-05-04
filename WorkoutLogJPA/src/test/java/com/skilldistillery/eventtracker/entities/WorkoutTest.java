package com.skilldistillery.eventtracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class WorkoutTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Workout	workout;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("WorkoutLogJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		workout = em.find(Workout.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		workout = null;
		em.close();
	}

	@Test
	void test_workout_entity_mapping() {
		assertNotNull(workout);
		assertEquals("HIIT", workout.getType());
		assertEquals(1111, workout.getDuration());
		assertEquals(143, workout.getHeartRateAvg());
		assertTrue(workout.isFasted());
	}
}
