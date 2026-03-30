# PrismaFlux 🚀

A modern, full-stack database monitor and management dashboard built with **Prisma ORM**, **Express.js**, and **React**. This project demonstrates a clean architecture for managing relational data in a cloud-hosted PostgreSQL environment (Neon Tech).

## 🏗️ Architecture

```mermaid
graph TD
    Client[React Frontend] -->|API Calls / REST| Server[Express.js Server]
    Server -->|Prisma Client| DB[(PostgreSQL - Neon Tech)]
    Server -->|Seeding| DB
```

## ✨ Features

- **Real-time Synchronization**: Live dashboard showing current database state.
- **Full CRUD Support**: Manage Users and their associated Posts seamlessly.
- **Glassmorphic UI**: Premium, dark-mode aesthetic with smooth animations.
- **Clean Architecture**: Modularized backend controllers and frontend service layers.
- **Database Safety**: CASCADE deletions and automated timestamps (`createdAt`, `updatedAt`).

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Lucide React, Glassmorphism CSS.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: Prisma ORM, PostgreSQL (Neon Tech).
- **Tooling**: Concurrent Dev Server, ESLint, Prettier.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A Neon Tech PostgreSQL Database URL

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tusharkhadde/Prisma-Demo-Application.git
   cd Prisma-Demo-Application
   ```

2. **Backend Configuration**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   ```

3. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push # Or npx prisma migrate dev
   ```

4. **Frontend Configuration**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

From the root directory (using the concurrently script):
```bash
cd server
npm run dev
```

The server will run on `http://localhost:3000` and the frontend on `http://localhost:5173`.

## 📜 License

MIT
