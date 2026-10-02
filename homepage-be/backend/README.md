# Closis backend

Express + MongoDB API for the Closis frontend (`../frontend`).

## Run it

```bash
cd backend
npm install
cp .env.example .env      # then fill in MONGO_URI and SECRET
npm run dev               # http://localhost:4000
```

In another terminal:

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

The frontend calls `/api/...` and Vite forwards it to `http://localhost:4000` (see `frontend/vite.config.js`).

## Auth: users vs non-users

- Login/signup return `{ _id, name, email, token }`. The FE saves it in `localStorage("user")`.
- Logged-in requests send `Authorization: Bearer <token>` (token lasts 3 days).
- `requireAuth` = **users only** → 401 `{ error }` for guests.
- `optionalAuth` = **users + non-users** → sets `req.user` to the user or `null`, never blocks.
- Every error response is `{ error: "..." }` because the FE hooks read `data.error`.

## Endpoints

| Method | Path | Who | Used by |
|---|---|---|---|
| POST | `/api/users/signup` `{ name, email, password }` | everyone | SignupPage |
| POST | `/api/users/login` `{ email, password }` | everyone | LoginPage |
| POST | `/api/users/forgot-password` `{ email }` | everyone | ForgotPassword |
| POST | `/api/users/reset-password/:token` `{ password }` | everyone | (future reset page) |
| GET | `/api/users/me` | users + non-users | homepage token check |
| GET | `/api/users/profile` | users | |
| DELETE | `/api/users/profile` | users | Profile → Delete Account |
| GET | `/api/outfits/history` | users | History |
| POST | `/api/outfits` `{ name, image, weather, destination, style, items }` | users | AI outfit generator |
| PATCH | `/api/outfits/:outfitId/use` | users | "wore this" → usageCount + 1 |
| DELETE | `/api/outfits/:outfitId` | users | |
| CRUD | `/api/items` | everyone (for now) | Saga's wardrobe items |

**Forgot password:** there is no email service yet, so the reset link is printed in the server console.
