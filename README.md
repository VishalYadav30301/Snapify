# 📸 Snapify – API-Driven Photo Gallery

Snapify is a secure and scalable RESTful API backend for a modern photo gallery application. Built using **NestJS**, **PostgreSQL (with Sequelize ORM)**, and **Cloudinary** for image uploads, Snapify ensures a smooth developer and user experience with robust JWT-based authentication, structured logging (Winston + Morgan), and modular code architecture.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 🧾 User Roles (Admin, User)
- 📁 Image Uploads via Cloudinary
- 📦 Sequelize-based PostgreSQL Integration
- 🧱 Modular Structure with Clean Codebase
- 🧠 Environment-based Configuration Management
- 🛡️ Protected Routes with Auth Guards
- 📈 Logging (Winston + Morgan)
- 🔄 CRUD Operations for Photo Management
- ✅ Request Validation (DTOs and Pipes)
- 🌍 Ready for Deployment

---

## 🛠️ Tech Stack

| Technology     | Description                           |
|----------------|---------------------------------------|
| **NestJS**     | Scalable Node.js framework            |
| **PostgreSQL** | Relational Database                   |
| **Sequelize**  | ORM for PostgreSQL                    |
| **Cloudinary** | Media management & cloud storage      |
| **JWT**        | Authentication with access tokens     |
| **Winston**    | Custom logging system                 |
| **Morgan**     | HTTP request logger middleware        |
| **Multer**     | File uploading middleware             |
| **TypeScript** | Strong typing and better tooling      |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/snapify.git
cd snapify
npm install

⚙️ Environment Variables
Create a .env file in the root with the following keys:

env
Copy
Edit
PORT=3000

# PostgreSQL DB
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=snapify

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
