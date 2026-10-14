# MeetMyFaculty

MeetMyFaculty is a student-faculty communication platform for counseling appointments, routines, announcements, academic discussions, resources, and faculty information.

## Technology

- Client: React, Vite, React Router, Axios
- Server: Node.js, Express, MongoDB Atlas, Mongoose
- Security: JWT, bcrypt password hashing, role-based authorization

## Start the project

1. Copy `server/.env.example` to `server/.env` and add your MongoDB Atlas connection string and JWT secret.
2. Install dependencies:

```bash
cd server
npm install
npm run seed
npm run dev
```

In a second terminal:

```bash
cd client
npm install
npm run dev
```

3. Open the Vite address shown in the terminal, normally `http://localhost:5173`.

## MongoDB Atlas

Create a free MongoDB Atlas cluster, create a database user, allow your current IP address in Network Access, then copy the connection string into `MONGO_URI` in `server/.env`.

## Sample accounts after seeding

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@diu.edu.bd | Admin123! |
| Faculty | sadia.swe@diu.edu.bd | Faculty123! |
| Student | fatin.swe@diu.edu.bd | Student123! |

Do not use these passwords in a real deployment.

