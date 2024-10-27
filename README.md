
# E-Commerce Application

This is an eCommerce application built with **Spring Boot** for the backend, **Oracle SQL Developer** as the database, and a **React** frontend powered by **Vite**. The application is designed to provide a seamless shopping experience with various functionalities for both customers and administrators.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running Oracle DB with Docker](#running-oracle-db-with-docker)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Product listing and details
- Shopping cart functionality
- Order management
- Admin panel for managing products and orders

## Technologies Used

- **Backend**:
  - [Spring Boot](https://spring.io/projects/spring-boot) - Java-based framework for building RESTful web services.
  - [Oracle SQL Developer](https://www.oracle.com/database/sqldeveloper/) - Integrated development environment for working with Oracle databases.

- **Frontend**:
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/) - Next-generation frontend tool that provides a fast development experience.

- **Database**:
  - Oracle Database running in a Docker container.

## Setup

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ecommerce_app/backend
Ensure you have Java and Maven installed on your machine.

Build the Spring Boot application:

bash
Copy code
mvn clean install
Configure your application properties to connect to Oracle DB. Update src/main/resources/application.properties with the necessary database connection details.

Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install the frontend dependencies:

bash
Copy code
npm install
Start the Vite development server:

bash
Copy code
npm run dev
Running Oracle DB with Docker
Pull the Oracle Database image:

bash
Copy code
docker pull oracleinanutshell/oracle-xe-11g
Run the Docker container:

bash
Copy code
docker run -d -p 1521:1521 --name oracle-db oracleinanutshell/oracle-xe-11g
Connect to the Oracle database using SQL Developer with the following credentials:

Username: system
Password: oracle
Database: xe
Usage
Once the backend and database are running, you can access the frontend application by navigating to http://localhost:3000 (or the port specified by Vite).
The backend API will be accessible at http://localhost:8080.
Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue.

License
This project is licensed under the MIT License - see the LICENSE file for details.




