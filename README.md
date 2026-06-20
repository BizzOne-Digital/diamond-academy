# American Diamond Academy — MERN Stack

Full-stack e-commerce platform for online diamond grading courses with Stripe payments, admin panel, and Zoom session management.

---

## Project Structure

```
american-diamond-academy/
├── backend/          ← Express.js API
│   ├── src/
│   │   ├── models/       (User, Course, Order)
│   │   ├── routes/       (auth, courses, payments, orders, admin, upload)
│   │   ├── middleware/   (auth.js)
│   │   └── server.js
│   ├── seed.js           (Create admin + sample courses)
│   ├── vercel.json
│   └── package.json
│
├── frontend/         ← React.js App
│   ├── src/
│   │   ├── pages/        (Home, Education, CourseDetail, About, Contact, FAQ, Dashboard, Login, Register)
│   │   ├── pages/admin/  (AdminLayout, Dashboard, Courses, CourseForm, Users, Orders)
│   │   ├── components/   (Navbar, Footer)
│   │   ├── context/      (AuthContext)
│   │   └── utils/        (api.js)
│   ├── vercel.json
│   └── package.json
│
└── package.json      ← Root scripts
```

---

## Local Development Setup

### Step 1 — Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2 — Backend Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/american-diamond-academy

JWT_SECRET=your_very_secret_key_minimum_32_characters
JWT_EXPIRE=30d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password

FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Step 3 — Frontend Environment Variables

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

### Step 4 — Seed Database (admin user + sample courses)

```bash
cd backend
node seed.js
```

This creates:
- **Admin:** admin@americandiamondacademy.com / Admin@12345
- 2 sample courses

### Step 5 — Run Both Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

---

## Vercel Deployment

### Deploy Backend

1. Push `backend/` to GitHub
2. Import to Vercel
3. Set root directory: `backend`
4. Add all environment variables in Vercel dashboard
5. Deploy → copy your backend URL (e.g. `https://ada-backend.vercel.app`)

### Deploy Frontend

1. Update `frontend/vercel.json` — replace `your-backend-url.vercel.app` with real backend URL
2. Push `frontend/` to GitHub  
3. Import to Vercel
4. Set root directory: `frontend`
5. Add environment variables:
   - `REACT_APP_API_URL=https://your-backend.vercel.app/api`
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx`
6. Deploy

### Stripe Webhook (Production)

In Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://your-backend.vercel.app/api/payments/webhook`
- Events: `checkout.session.completed`
- Copy the webhook secret → add to backend env as `STRIPE_WEBHOOK_SECRET`

---

## Admin Panel

Access at: `http://localhost:3000/admin` (or your deployed URL)

**Features:**
- 📊 Dashboard — revenue, students, orders stats
- 📚 Courses — add, edit, delete courses with image upload
- 📅 Session Management — add Zoom sessions with date/time/link per course
- 👥 Students — view and manage student accounts
- 💳 Orders — track all payments and revenue

**Session Management:**
Admin can add/edit/delete Zoom sessions for any course at any time. Each session has:
- Date, Time, Timezone
- Zoom Link + Password
- Duration
- Completion status

Enrolled students see the sessions (with Zoom links) in their dashboard.

---

## Services Required

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| MongoDB Atlas | Database | 512MB free |
| Cloudinary | Image uploads | 25GB free |
| Stripe | Payments | No monthly fee |
| Vercel | Hosting (both) | Free |

---

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Stripe, Cloudinary, Multer

**Frontend:** React.js, React Router v6, Axios, React Hot Toast, Stripe.js, React Helmet
