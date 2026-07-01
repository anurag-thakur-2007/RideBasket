# 🚖 RideBasket

> A full-stack ride-sharing platform built exclusively for VIT Bhopal students to create, discover, and join shared taxi rides while splitting travel costs.

![MERN](https://img.shields.io/badge/Stack-MERN-3FA037?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)

---

## 🌐 Live Demo

### Frontend
https://ride-basket.vercel.app

### Backend API
https://ridebasket-backend.onrender.com

---

# 📌 Overview

RideBasket is a student-focused ride-sharing platform designed to simplify intercity and airport travel for VIT Bhopal students.

Students can:

- Create ride baskets
- Search available rides
- Join existing rides
- Manage incoming join requests
- Approve or reject passengers
- Split cab costs fairly

The platform provides a clean, responsive interface with secure authentication and cloud-hosted infrastructure.

---

# ✨ Features

## Authentication

- Secure JWT Authentication
- User Registration
- Login
- Password Hashing using bcrypt
- Protected Routes

---

## Ride Basket Management

- Create Ride Basket
- Edit Ride Basket
- Delete Ride Basket
- View Ride Details
- Available Seat Tracking
- Cost Per Person

---

## Search & Filtering

Search rides by:

- Pickup Point
- Destination
- Travel Date
- Gender Preference
- Cab Type

---

## Join Requests

Passengers can:

- Request to Join
- Cancel Request

Ride Organizers can:

- Accept Requests
- Reject Requests

---

## User Dashboard

- My Created Rides
- Joined Rides
- Pending Requests
- Accepted Requests

---

## Database

MongoDB Atlas

Collections:

- Users
- Baskets
- Requests

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Toastify

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 📂 Project Structure

```text
RideBasket
│
├── backend
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── basketController.js
│   │   └── requestController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Basket.js
│   │   └── Request.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── basketRoutes.js
│   │   └── requestRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend
│   │
│   ├── dist
│   ├── node_modules
│   ├── public
│   │
│   ├── src
│   │
│   │── assets
│   │     └── logo.png
│   │
│   │── components
│   │   │
│   │   ├── basket
│   │   │   ├── BasketCard.jsx
│   │   │   └── BasketForm.jsx
│   │   │
│   │   ├── common
│   │   │   ├── Button.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Select.jsx
│   │   │
│   │   └── request
│   │       ├── JoinBasketModal.jsx
│   │       └── RequestCard.jsx
│   │
│   │── context
│   │     └── AuthContext.jsx
│   │
│   │── data
│   │     └── locations.js
│   │
│   │── hooks
│   │     └── useAuth.js
│   │
│   │── layouts
│   │     └── MainLayout.jsx
│   │
│   │── pages
│   │   │
│   │   ├── BasketDetails
│   │   │     └── BasketDetails.jsx
│   │   │
│   │   ├── CreateBasket
│   │   │     └── CreateBasket.jsx
│   │   │
│   │   ├── Home
│   │   │     └── Home.jsx
│   │   │
│   │   ├── Login
│   │   │     └── Login.jsx
│   │   │
│   │   ├── MyBaskets
│   │   │     └── MyBaskets.jsx
│   │   │
│   │   ├── MyRequests
│   │   │     └── MyRequests.jsx
│   │   │
│   │   ├── Profile
│   │   │     └── Profile.jsx
│   │   │
│   │   ├── Register
│   │   │     └── Register.jsx
│   │   │
│   │   └── Splash
│   │         └── Splash.jsx
│   │
│   │── services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── requestService.js
│   │
│   │── utils
│   │   ├── auth.js
│   │   └── constants.js
│   │
│   │── App.jsx
│   │── main.jsx
│   │── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

Production

```env
VITE_API_URL=https://ridebasket-backend.onrender.com/api
```

---

# 🚀 Local Installation

Clone Repository

```bash
git clone https://github.com/anurag-thakur-2007/RideBasket.git

cd RideBasket
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📦 Production Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Protected Routes
- MongoDB Atlas
- Environment Variables
- CORS Enabled

---

# 📈 Future Improvements

- Google Maps Integration
- Live Location Tracking
- Real-time Notifications
- In-App Chat
- Ratings & Reviews
- OTP Authentication
- Ride History
- Email Notifications
- Admin Dashboard
- Progressive Web App (PWA)

---

# 👨‍💻 Author

**Anurag Thakur**

GitHub

https://github.com/anurag-thakur-2007


Linkedin 

https://www.linkedin.com/in/anurag-thakur-9b6805346/
---

# ⭐ Support

If you found this project helpful,

please consider giving it a ⭐ on GitHub.

It motivates future development and improvements.

---

Made with ❤️ using the MERN Stack.
