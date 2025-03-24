# SampleMap

## Overview
SampleMap is a simple application that demonstrates user authentication, dashboard data, and map data using a Node.js backend with Express, MongoDB, and JWT for authentication.

## Features
- User login with JWT authentication
- Dashboard displaying various locations
- Map data endpoint

## Technologies Used
- Node.js
- Express
- MongoDB
- JWT (JSON Web Token)
- bcrypt.js
- dotenv
- cors

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/SampleMap.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd SampleMap/backend
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the backend directory and add your MongoDB connection string and JWT secret key:
    ```env
    DB_CONNECT=your_mongodb_connection_string
    SECRET_KEY=your_jwt_secret_key
    ```

5. Start the server:
    ```bash
    node app.js
    ```

## API Endpoints

### Login
- **URL:** `/api/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "token": "your_jwt_token"
    }
    ```

### Dashboard
- **URL:** `/api/dashBoard`
- **Method:** `GET`
- **Response:**
    ```json
    {
        "cards": [
            {
                "id": 1,
                "location": "New Delhi",
                "image_url": "image_url",
                "team_member": 10,
                "status": "active"
            },
            ...
        ]
    }
    ```

### Map
- **URL:** `/api/map`
- **Method:** `GET`
- **Response:**
    ```json
    {
        "message": "Map Data",
        "location": {
            "lat": 20.5937,
            "lng": 78.9629
        }
    }
    ```

## Middleware

### Authenticate User
- **Function:** `authenicateUser`
- **Description:** Middleware to authenticate user using JWT token.

## License
This project is licensed under the MIT License.
#   B a c k e n d M a p  
 