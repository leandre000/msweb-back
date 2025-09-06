📖 User Authentication & Forgot Password API

This project is a User Authentication system made with Node.js, Express, MongoDB, and TypeScript.
It has signup, login, email OTP verification, and forgot password with reset option.

🚀 Features

Signup with OTP verification (via email)

Login with email & password

Verify email with OTP

Forgot password flow → send OTP, verify OTP, reset password

Reusable middleware (follow DRY principle)

🛠️ Concepts Used

Express Router → For handling routes

Middleware → For reusable logic (validation, hashing, OTP, email sending)

bcryptjs → For hashing passwords

crypto → For generating OTP

nodemailer → For sending OTP email

Mongoose → For database and user schema

TypeScript Interfaces → For type safety

DRY Principle → Don’t Repeat Yourself (reusing code)

📡 API Endpoints
1️⃣ Signup User

Route:

POST /signup


Input JSON:

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "number": 1234567890,
  "password": "StrongPassword123"
}


Response:

{ "message": "User registered successfully. Please verify your email." }

2️⃣ Verify Email OTP

Route:

POST /verify-otp


Input JSON:

{
  "email": "johndoe@example.com",
  "otp": "123456"
}


Response:

{ "message": "Email verified successfully" }

3️⃣ Login User

Route:

POST /login


Input JSON:

{
  "email": "johndoe@example.com",
  "password": "StrongPassword123"
}


Response:

{
  "message": "Login successful",
  "user": {
    "id": "64f93be21a...",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "number": 1234567890
  }
}

🔐 Forgot Password Flow
4️⃣ Forgot Password (Send OTP)

Route:

POST /forgot-password


Input JSON:

{
  "email": "johndoe@example.com"
}


Response:

{ "message": "OTP sent to your email for password reset" }

5️⃣ Verify Reset OTP

Route:

POST /verify-reset-otp


Input JSON:

{
  "email": "johndoe@example.com",
  "otp": "123456"
}


Response:

{ "message": "OTP verified, you can now reset your password" }

6️⃣ Reset Password

Route:

POST /reset-password


Input JSON:

{
  "email": "johndoe@example.com",
  "password": "NewStrongPassword456"
}


Response:

{ "message": "Password reset successful" }

🔄 Flow

Signup → User registered + OTP sent.

Verify OTP → Confirms user’s email.

Login → Works only if email verified.

Forgot Password → Send OTP to email.

Verify Reset OTP → Confirms OTP for reset.

Reset Password → Change password after OTP check.

🧪 Testing on Postman

Always use Content-Type: application/json header.

Test APIs in this order:

/signup

/verify-otp

/login

/forgot-password

/verify-reset-otp

/reset-password

Check email inbox for OTP when testing.

📂 Routes Overview
Method	Route	Description
POST	/signup	Register + send OTP
POST	/verify-otp	Verify email with OTP
POST	/login	User login
POST	/forgot-password	Send OTP for reset
POST	/verify-reset-otp	Verify OTP for reset
POST	/reset-password	Reset passwordw