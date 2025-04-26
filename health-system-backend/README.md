# Health System Management Backend
This is the backend for the Health System Management project. The backend is responsible for managing client data, health programs, and enrollments. It supports features like client search, program creation, and enrollment management. The backend is built with Node.js, Express, and MongoDB.

## Features
Client Management: Add, update, and search clients by their first name or last name.

Program Management: Create, list, and validate health programs.

Client Enrollment: Enroll clients into multiple health programs.

Search Functionality: Search clients by first or last name.

Error Handling: Graceful error handling with appropriate responses.

## Installation
Follow these steps to set up the backend locally.

## Prerequisites
Node.js (>= 14.0.0)

MongoDB (local or cloud instance)

### Step 1: Clone the repository
```js
git clone https://github.com/your-username/health-system-backend.git
cd health-system-backend
```
### Step 2: Install dependencies
```js
npm install
```
### Step 3: Configure environment variables
Create a .env file in the root of the project and add your MongoDB URI:

```js
PORT=5000

MONGODB_URI=mongodb_uri

COOKIE_SECRET=cookie_secret

JWT_SECRET=jwt_secret

NODE_ENV=development
```
Step 4: Run the server
```js
npm run dev
```
The server will run on [http://localhost:5000].

## Endpoints
`POST /api/programs`
Description: Create a new health program.

Request body:
```js
{
  "name": "Program Name",
  "description": "Program Description"
}
```
Response: Returns the created program object.

GET /api/programs
Description: Get all health programs.

Response: Returns a list of all programs.

POST /:id/enroll
Description: Enroll a client into one or more health programs.

Request body:
```js
{
  "programIds": ["programId1", "programId2"]
}
```
Response: Returns the updated client object with enrolled programs.

GET /search
Description: Search clients by first or last name.

Query parameter: q (search query)

Response: Returns a list of clients that match the search query.

## Technologies Used
Node.js: Server-side runtime.

Express: Web framework for Node.js.

MongoDB: NoSQL database for storing client and program data.

Mongoose: ODM for interacting with MongoDB.

## Contributing
Feel free to fork and submit pull requests. Ensure all tests pass and the code follows existing style conventions.
