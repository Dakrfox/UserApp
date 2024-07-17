# UserApp Documentation and User Guide

## Introduction
This application serves as a demonstration of a user management system, showcasing the creation, reading, updating, and deletion (CRUD) functionalities for users. It's designed to be easily integrated into larger, more complex applications.

## Technology Stack
  * Frontend: Next.js (ReactJS framework) & TailwindCSS
  * Backend: Node.js with Express.js
  * Database: MongoDB

## Prerequisites
1. Docker Installation: Download and install Docker Desktop from the official website: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

## User Guide
1. Setting Up the Backend

### 1.1. Docker-Compose.yaml
This file defines your MongoDB container configuration.

```
version: '3'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    volumes:
      - ./data:/data/db  # Persist data between container restarts
    ports:
      - "27017:27017"   # Map container port 27017 to host port 27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root  # Customize username
      - MONGO_INITDB_ROOT_PASSWORD=password  # Customize password (highly recommended)
```

**Security Note**: It's strongly recommended to use unique credentials for the MongoDB root user and avoid the provided "root" and "password" in production environments. Update the `environment` section with your preferred credentials.

### 1.2. Backend Startup

* Navigate to your project's backend directory.
* Run `docker-compose up` to start the MongoDB container.
  
## 2. Backend Dependencies and Configuration

### 2.1. Dependencies Installation

Inside the backend project directory, run `npm install` to install required dependencies.

### 2.2. Environment Variable (.env)

* Create a file named `.env` (not `.env.local`) at the root of your backend project.
* Add the following line, replacing `your_secret_key` with a strong, unique secret key:

```
SECRETKEY=your_secret_key
```

This secret key is used for JWT (JSON Web Token) authentication purposes.

##3 2.3. Database Connection Verification

* Start the backend server using `npm run start`. This typically uses Nodemon for development-friendly restarts.
* The console should indicate successful database connection.

### 2.4. API Testing (Optional)

* Consider using tools like Postman to test the backend APIs after creating an initial set of test users. This ensures proper functionality before integrating with the frontend.

## 3. Setting Up the Frontend

## 3.1. Frontend Download

Clone or download the frontend project from [https://github.com/Dakrfox/UserAppFront](https://github.com/Dakrfox/UserAppFront).

### 3.2. Dependency Installation

Navigate to the frontend project directory.
Run `npm install` to install the required dependencies.

### 3.3. Environment Variable (.env.local)

* Create a file named `.env.local` at the root of your frontend project.
* Add the following line, replacing `your_backend_secret_key` with the same secret key used in the backend's `.env` file:

```
SECRETKEY=your_backend_secret_key
```

### 3.4. JWT Dependency Version

* As mentioned in the provided information, there might be a version conflict with the `jsonwebtoken` dependency.
  + If you encounter issues with this dependency, consider temporarily omitting it during frontend installation, but be sure to handle its inclusion appropriately with proper version management if required by the code.
* This step might require some code adjustments if the frontend relies heavily on jsonwebtoken.

### 3.5. Frontend Development Server

* Start the frontend development server using `npm run dev`. This will typically create a live server for testing.

## Additional Notes

* The backend and frontend ports are configured to run on 3000 and 3001 respectively by default. This helps avoid potential CORS (Cross-Origin Resource Sharing) issues.
* If you need to modify these ports, ensure appropriate CORS configuration is set up for your development and deployment environments.

## Deployment Considerations

For deployment scenarios, refer to the specific deployment guides for Next.js and consider containerization approaches for the backend using tools like Docker.

## Testing

* Test all functionalities of the application, including user creation, reading, updating
