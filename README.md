# R3aya 🩺

R3aya is a full-stack healthcare and doctor appointment booking platform designed to make it easier for patients to find doctors, book appointments, and manage their healthcare information.

The system provides dedicated interfaces for patients, doctors, and administrators to manage appointments, doctors, profiles, availability, and healthcare services.

## 🌐 Live Demo

- **Frontend:** https://cybersentinels.cloud
- **Admin Dashboard:** https://cybersentinels.cloud/admin

## 🎨 Design

The complete UI/UX design for R3aya, including all pages, components, and the design system, is available on Figma:

- **Figma Design File:** https://www.figma.com/design/TkMat8L1b0RdaPour6oHZJ/R3aya-website?node-id=1-632

## ✨ Features

### 👤 Patient
- User registration and login
- Browse available doctors
- Search doctors by specialty
- View doctor profiles
- Book appointments
- Manage appointments
- Cancel appointments
- Update personal profile
- Upload profile picture
- Online payment integration

### 👨‍⚕️ Doctor
- Doctor login
- Doctor dashboard
- View appointments
- Manage appointment status
- Update doctor profile
- Update availability
- View patient information

### 🛠️ Admin
- Admin authentication
- Dashboard with statistics
- Add new doctors
- Manage doctors
- Update doctor availability
- View all appointments
- Manage appointment status
- Manage doctor profiles

## 🧰 Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- JavaScript

### Admin Dashboard
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary

### Payment
- Razorpay
- Stripe

### Deployment
- Ubuntu VPS
- Nginx
- PM2
- MongoDB Atlas

## 📁 Project Structure

```text
R3aya/
│
├── admin/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

## 🔐 Security

The project uses:

- JWT-based authentication
- Protected API routes
- Environment variables for sensitive credentials
- Admin and doctor authorization middleware
- Secure password handling
- Cloudinary for image storage

> Sensitive credentials and environment variables are excluded from the repository.

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/abobasha74/R3aya.git
cd R3aya
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### 4. Install Admin Dependencies

```bash
cd ../admin
npm install
```

Configure the required environment variables for the admin dashboard.

## ▶️ Run the Project

### Backend

```bash
cd backend
npm run server
```

### Frontend

```bash
cd frontend
npm run dev
```

### Admin Dashboard

```bash
cd admin
npm run dev
```

## 📸 Main Modules

- Patient Portal
- Doctor Dashboard
- Admin Dashboard
- Doctor Management
- Appointment Management
- Authentication & Authorization
- Profile Management
- Online Payments
- Image Upload
- Doctor Availability Management

## 👨‍💻 Author

**Ahmed Abo Basha**

Cyber Security Student
Delta University for Science and Technology

## 📄 License

This project is developed for educational and graduation project purposes.
