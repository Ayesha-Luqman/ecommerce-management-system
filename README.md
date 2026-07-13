# E-Commerce Management System

A full-stack **E-Commerce Management System** built using **React.js** and **Django REST Framework**. The application allows users to browse products, search and filter by category, manage a shopping cart, place orders, and view their order history through a secure JWT-authenticated REST API.

---

## Features

* User Registration and Login
* JWT Authentication
* Product Listing
* Product Details
* Product Search
* Category Filtering
* Shopping Cart Management
* Update Product Quantity
* Remove Products from Cart
* Place Orders
* View Order History
* Django Admin Panel
* RESTful API
* Responsive User Interface using Bootstrap

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Bootstrap

### Backend

* Python
* Django
* Django REST Framework
* Django REST Framework SimpleJWT
* Django CORS Headers
* SQLite

---

## Project Structure

```
E-Commerce-Management-System/
│
├── backend/                   # Django Backend
│   ├── ecommerce/             # Django project settings
│   ├── store/                 # Main application
│   ├── media/                 # Product images
│   ├── manage.py
│   ├── requirements.txt
│   ├── build.sh
│   └── db.sqlite3
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/E-Commerce-Management-System.git
cd E-Commerce-Management-System
```

---

## Backend Setup

Navigate to the backend directory:

```bash
cd ecommerce
```

Create a virtual environment (recommended):

**Windows**

```bash
python -m venv myvworld
myvworld\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv myvworld
source myvworld/bin/activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

Create an admin account (optional):

```bash
python manage.py createsuperuser
```

Run the backend server:

```bash
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000/
```

---

## Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173/
```

---

## API Endpoints

### Authentication

* POST `/api/register/`
* POST `/api/login/`
* POST `/api/logout/`
* POST `/api/token/`
* POST `/api/token/refresh/`

### Products

* GET `/api/products/`
* GET `/api/products/<id>/`
* GET `/api/categories/`

### Cart

* GET `/api/view-cart/`
* POST `/api/add-to-cart/`
* PUT `/api/update-cart/`
* POST `/api/remove-cart/`

### Orders

* POST `/api/place-order/`
* GET `/api/my-orders/`

---

## Future Improvements

* Online Payment Integration
* Product Reviews and Ratings
* Wishlist
* User Profile Management
* Order Cancellation
* Email Notifications
* Product Stock Notifications

---

## Author

**Ayesha Luqman**

- GitHub: https://github.com/Ayesha-Luqman
- LinkedIn: https://www.linkedin.com/in/ayesha-luqman/

