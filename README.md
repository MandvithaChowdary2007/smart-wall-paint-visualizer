# Smart Wall Paint Visualizer

Full-stack MEAN application:
- Angular 15 frontend
- Node.js + Express REST API
- MongoDB / Mongoose
- JWT authentication with User/Admin roles
- Image upload and wall polygon selection
- Canvas-based paint preview with undo/redo/reset/before-after
- Product/color catalog
- Inspiration gallery
- Paint calculator
- Cart drawer
- Admin dashboard
- Neo-Brutalist responsive UI

## Requirements
- Node.js 18+
- MongoDB Atlas or local MongoDB
- Angular CLI 15+

## 1. Backend

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Linux/macOS:
```bash
cp .env.example .env
```

Default API: http://localhost:5000

## 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Open http://localhost:4200

## Demo accounts

After `npm run seed`:

Admin:
- email: admin@smartpaint.local
- password: Admin@12345

User:
- email: user@smartpaint.local
- password: User@12345

Change these passwords before deployment.

## MongoDB

Set MONGO_URI in backend/.env.

Example Atlas:
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/smartpaint?retryWrites=true&w=majority

## Production

Build Angular:
```bash
cd frontend
npm run build
```

Set the frontend API URL in `src/environments/environment.ts`.

Deploy:
- Angular: Vercel / Netlify / AWS
- Node API: Render / AWS / Railway
- Database: MongoDB Atlas

## Security notes
This project includes basic JWT authentication, role middleware, MIME/type and size checks for uploads, and password hashing. For production, add object storage, rate limiting, stronger validation, refresh tokens, CSRF strategy where applicable, secure cookies if desired, antivirus/image processing, and comprehensive authorization checks.
