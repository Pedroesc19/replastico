# Replastico Project

This repository contains a **full stack web application** with:

- **Express backend** located in [`backend/server.js`](backend/server.js) which connects to MongoDB and implements JWT based authentication.
- **React frontend** located in [`frontend/`](frontend/) built with Create React App.

## Installation

Install dependencies in both the `backend` and `frontend` directories:

```bash
cd backend
yarn install # or npm install

cd ../frontend
yarn install # or npm install
```

Create a `.env` file inside `backend` with variables similar to the sample below:

```env
MONGO_URI=<your Mongo connection string>
ADMIN_EMAIL=<admin user email>
JWT_SECRET=<jwt signing secret>
```

After configuring the database connection you can create the default admin user
by running:

```bash
cd backend
node scripts/createAdmin.js
```
The credentials are `admin@gmail.com` with password `password`.

## Running the apps

To start the backend API:

```bash
cd backend
node server.js
```

To start the React frontend:

```bash
cd frontend
yarn start
```

The backend will listen on port `5000` by default and the frontend on `3000`.

## Building the frontend

For a production build of the React app:

```bash
cd frontend
yarn build
```

The compiled files will be generated in `frontend/build`.

## Additional notes

Uploaded images are stored in the `backend/uploads/` folder and can be accessed through the `/uploads` route once the backend is running.
