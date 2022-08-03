# E-Commerce Data Demo

Works on the e-commerce dataset from [Kaggle](https://www.kaggle.com/carrie1/ecommerce-data/download).

Receives CSV file upload from user and load into in-memory H2 database. Provides REST API for listing with pagination and search.

Frontend is built using React (Typescript) with components and styling from [SGDS](https://www.designsystem.tech.gov.sg/). Backend is built using Spring Boot (Kotlin).

## Installation

This project uses NPM and Maven as the build tools.

### Frontend

```
cd frontend
npm install
```

### Backend

```
cd backend/demo
mvn dependency:resolve
```

## Run (Dev)

Run the following commands in separate terminals to preview the app in development mode.

The frontend will be served from http://localhost:3000 and the backend will be served from http://localhost:8080.

HTTP requests will be proxied to the backend server (see `frontend/package.json` for the configuration).

### Frontend

```
cd frontend
npm start
```

### Backend

```
cd backend/demo
mvn spring-boot:run
```
