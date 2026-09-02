# Personal Library Tracker

A full-stack application for managing a personal book collection. Users can add, edit, delete, search and filter books while tracking reading status, ratings and notes.

## Features

- Add, edit and delete books
- Track Want to Read, Reading and Finished statuses
- Rate finished books from 1–5
- Search by title or author
- Filter books by reading status
- View reading summary counts
- Runtime request validation
- Responsive interface
- REST API with CRUD operations

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- PostgreSQL
- Prisma ORM
- Zod

## REST API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/books` | Retrieve all books |
| POST | `/api/books` | Create a book |
| GET | `/api/books/:id` | Retrieve one book |
| PATCH | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

## Application Architecture

```text
React interface
      ↓
Next.js REST API
      ↓
Zod validation
      ↓
Prisma ORM
      ↓
PostgreSQL
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/nasirahkamal/personal-library.git
cd personal-library
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/personal_library"
```

Apply migrations and generate Prisma Client:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Current Status

The core CRUD application is complete. Planned improvements include automated tests, authentication and production deployment.