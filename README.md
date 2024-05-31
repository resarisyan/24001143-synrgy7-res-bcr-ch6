
# README.md

## Description

This is a project challenge Binar Chapter 6. The project is a simple CRUD application that can be used to manage a list of cars.

## Installation
To run this project, you need to have Node.js installed on your computer. If you don't have it yet, you can download it [here](https://nodejs.org/). After you have Node.js installed, you can follow these steps to run the project:

1. Clone this repository to your computer.
```bash
git clone https://github.com/resarisyan/24001143-synrgy7-res-bcr-ch6
```

2. Go to the project directory.
```bash
cd 24001143-synrgy7-res-bcr-ch6
```

3. Install the dependencies.
```bash
npm install
```

4. Run the project.
```bash
npm start
```

5. Open your browser and go to `http://localhost:9999`.

## Usage
You can use this project to manage a list of cars. You can add a new car, edit an existing car, delete a car, and view the details of a car.

## Endpoints
The following are the available endpoints:

### Auth
- POST `api/v1/auth/login` - Login to the application.
- POST `api/v1/auth/register` - Register a new user.
- POST `api/v1/auth/logout` - Logout from the application.
- POST `api/v1/auth/me` - Get the current user.

### Cars
- GET `api/v1/cars` - Get all cars.
- POST `api/v1/cars` - Add a new car.
- GET `api/v1/cars/:id` - Get a car by ID.
- PUT `api/v1/cars/:id` - Update a car by ID.
- PUT `api/v1/cars/restore/:id` - Restore a car by ID.
- DELETE `api/v1/cars/:id` - Delete a car by ID.
- DELETE `api/v1/cars/force/:id` - Force delete a car by ID.

### Admin
- GET `api/v1/admin` - Get all admin.
- POST `api/v1/admin` - Add a new admin.
- GET `api/v1/admin/:id` - Get a admin by ID.
- PUT `api/v1/admin/:id` - Update a admin by ID.
- DELETE `api/v1/admin/:id` - Delete a admin by ID.


### Swagger
- GET `api-docs/` - Get the Swagger documentation.



## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Author
This project is created by [Resa Risyan]

## Acknowledgements
- [Binar Academy](https://binar.co.id/)
- [Synrgy](https://www.synrgy.co/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex.js](http://knexjs.org/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Inversify](https://inversify.io/)

## Additional Notes
This project is part of Synrgy x Binar Chapter 6. The project is a simple CRUD application that can be used to manage a list of cars. The project is created using Node.js, TypeScript, Express, PostgreSQL, Knex.js, JWT, Swagger, and Inversify.
