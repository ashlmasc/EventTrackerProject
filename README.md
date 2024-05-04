# EventTrackerProject

## Event Tracker - REST API Overview

The Event Tracker project is a Java-based REST API that tracks workout information in a MySQL database. 'MyFitnessTracker' is a (soon-to-be) web application designed to track fitness-related data, including workout details, exercise types, durations, and other relevant metrics.  This application provides basic CRUD (Create, Read, Update, Delete) operations through a RESTful API, allowing users to manage workout data efficiently.

## Description

The Event Tracker API enables users to perform CRUD operations on workout records stored in a MySQL database. Users can add, retrieve, update, and delete workout information via HTTP requests, making it convenient to manage and track workout sessions over time.

## Learning Objectives

- Create a JPA Project:
  - Develop Java entity classes that model the database tables.
  - Utilize JPA annotations to map entities to database tables.
- Configure a Spring Boot app to publish a REST API:
  - Implement Spring REST annotations for creating RESTful APIs.
  - Utilize Spring Data JPA to perform CRUD operations on the database.
  - Send and receive JSON data for efficient communication between the client and server.

## Key Features

- **Create:** Add new workout records to the database.
- **Read:** Retrieve detailed information about specific workout sessions.
- **Update:** Modify existing workout records to reflect changes or updates.
- **Delete:** Remove workout records that are no longer needed.
- **RESTful API:** Designed to adhere to REST principles, providing a standardized interface for interacting with workout data.
- **Testing with Postman:** Used Postman to test API endpoints and verify functionality.

## API Routes

| Action  | HTTP Method | URI Template      | Description                           |
|---------|-------------|-------------------|---------------------------------------|
| LIST    | GET         | /api/workouts     | Retrieve all workout records          |
| READ    | GET         | /api/workouts/{id}| Retrieve details of a specific workout|
| CREATE  | POST        | /api/workouts     | Create a new workout record           |
| UPDATE  | PUT         | /api/workouts/{id}| Update an existing workout record     |
| DELETE  | DELETE      | /api/workouts/{id}| Delete a workout record               |

## Technologies Used

- **IDE**: Spring Tool Suite 4.
- **Java**: Primary programming language.
- **Spring Boot**: Framework for building and deploying Java-based applications.
- **Spring Data JPA**: Simplifies database access and manipulation using JPA.
- **MySQL**: Database system used for storing workout data.
- **RESTful API**: Utilized to expose CRUD operations over HTTP.
- **Gradle**: Build tool for managing dependencies and project configuration.
- **Git/GitHub**: Version control and repository hosting platform.
- **Postman**: API development tool for testing and debugging.
- **AWS**: Deployment platform for hosting the application.

## Lessons Learned

- **Integration of JPA and Spring Boot:** Achieved mastery in configuring and utilizing JPA within the Spring Boot framework, facilitating efficient data management.
- **Effective CRUD Implementation:** Deepened understanding of implementing CRUD operations in web applications, ensuring seamless interaction with the database.
- **Advanced Database Management:** Enhanced skills in designing a database schema to support the management of workout data effectively.
- **Application Deployment:** Gained insights into deploying full-stack applications to a cloud environment (AWS), including setup for both the application and its database.