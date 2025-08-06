# Replastico Project

This repository contains a **full stack web application** with:

- **Express backend** located in [`backend/server.js`](backend/server.js) which connects to MongoDB and implements JWT based authentication.
- **React frontend** located in [`frontend/`](frontend/) built with Create React App.

## Architecture Overview

### Tech Stack

The application is built with a modern JavaScript stack:

- **Backend:** Node.js with Express, MongoDB via Mongoose, JSON Web Tokens for authentication, and Multer for file uploads. Additional tooling includes PDFKit for PDF generation and `xlsx` for exporting orders to Excel.
- **Frontend:** React 19 with React Router for routing and the Fetch API for HTTP requests.
- **Package Management:** Yarn is used in both the frontend and backend.

### Backend

The server resides in the `backend/` directory and uses ES Modules. It exposes RESTful routes under `/api`:

- `/api/auth` for registration and login.
- `/api/products` for CRUD operations on products.
- `/api/orders` and `/api/quotes` for order processing and quotations.
- `/api/upload` for image uploads stored in `backend/uploads/`.

Data is persisted in MongoDB using Mongoose models:

- **User** – stores user credentials, role, and hashed passwords.
- **Product** – catalog items with pricing and optional images.
- **Order** – customer orders with shipping information and payment status.

An Excel service in `backend/services/excelService.js` exports order data for administrative reporting.

### Frontend

The React app lives in `frontend/`. It manages global state through context providers:

- `AuthContext` stores the authenticated user's information and JWT token in `localStorage`.
- `CartContext` tracks items added to the shopping cart.

Components communicate with the backend using the Fetch API, sending JSON payloads and including the JWT token when needed.

### Communication Flow

The frontend issues HTTP requests to the backend's `/api` endpoints. Responses are returned as JSON. Uploaded images are served from the `/uploads` path on the backend. By default the backend listens on port `5000` and the frontend on port `3000`.

### Data Models

The core entities are:

- **User:** `{ name, email, password, role, createdAt }`
- **Product:** `{ name, description, price, imageUrl, category, createdAt }`
- **Order:** `{ user, products[{ product, quantity }], totalPrice, shippingAddress, contactName, phone, email, company, deliveryMethod, paymentStatus, status, createdAt }`

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

## Planned Features

A future release will include a payment workflow that leverages the `paymentStatus` field and tools for administrators to send quotes. The automatic quotation system computes delivery fees and totals so both customers and admins can review costs before payment integration is finalized.

## Additional notes

Uploaded images are stored in the `backend/uploads/` folder and can be accessed through the `/uploads` route once the backend is running.
