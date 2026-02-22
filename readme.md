# Task Management System

A RESTful Task Management System built using Spring Boot.  
This application allows managing Users, Tasks, Categories, and Priorities with clean layered architecture.

---

## Features
### Backend
- User management (CRUD)
- Task management with status updates
- Category management
- Priority management
- REST APIs with proper HTTP status codes
- DTO-based request handling
- Spring Data JPA with PostgreSQL
- Clean separation of Controller, Service, Repository layers

### Frontend
- Static UI served by Spring Boot

- Create, view, update, and delete tasks

- Fetch users, categories, and priorities dynamically

- REST API integration using Fetch API

- Simple and responsive layout
---

## Tech Stack

### Backend

- Java 17+

- Spring Boot

- Spring Web

- Spring Data JPA

- Hibernate

- PostgreSQL

- Lombok

- Maven

### Frontend

- HTML5

- CSS3

- JavaScript (ES6)

- Fetch API
---

## Project Structure

```
task-management-system
├── src/main/java/com/gevernova/task_management_system
│   ├── controller
│   ├── dto
│   ├── exception
│   ├── model
│   ├── repository
│   ├── service
│   └── TaskManagementSystemApplication.java
├── src/main/resources
│   ├── application.properties
│   └── static
│       ├── index.html
│       ├── css
│       │   └── style.css
│       └── js
│           └── app.js
├── pom.xml
└── README.md
```

## Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL
- Git

---

## Database Configuration

Create a PostgreSQL database:

 ```sql
 CREATE DATABASE task_management_system;
```

Running the Application

Clone the repository:
```
git clone https://github.com/GE-Training-2026/task-management-system.git
cd task-management-system
```

Run the application:

``` 
./mvnw spring-boot:run
```

Application will start at:
```
http://localhost:8080
```
## API Endpoints
- Users

- POST /api/users

- GET /api/users

- GET /api/users/{id}

- UT /api/users/{id}

- DELETE /api/users/{id}

## Categories

- POST /api/categories

- GET /api/categories

- GET /api/categories/{id}

- PUT /api/categories/{id}

- DELETE /api/categories/{id}


## Priorities

- POST /api/priorities

- GET /api/priorities

- GET /api/priorities/{id}

- PUT /api/priorities/{id}

- DELETE /api/priorities/{id}

## Tasks

- POST /api/tasks

- GET /api/tasks

- GET /api/tasks/{id}

- PUT /api/tasks/{id}

- PUT /api/tasks/{id}/status?status=IN_PROGRESS

- DELETE /api/tasks/{id}

## Sample Request

### Create Task

POST /api/tasks

```json
{
  "title": "Complete Spring Boot Project",
  "description": "Finish task management system",
  "userId": 1,
  "categoryId": 2,
  "priorityId": 1
}
```

## Error Handling

- Custom exceptions for resource not found

- Proper HTTP status codes

- Centralized exception handling (extensible)