# JobWala App Setup Guide

## What Was Done ✅

1. **Prisma Schema** - Added `password` field to User model for email/password authentication
2. **Database Setup** - Simplified `lib/db.ts` to use standard PrismaClient (removed custom adapter)
3. **Auth Configuration** - Updated `lib/auth.ts` to use the global db instance
4. **Search Store** - Created `app/store/useSearchStore.ts` with:
   - Search filters (query, location, job type, salary, experience, workplace, industry)
   - Search history tracking (last 10 searches)
   - Saved jobs management
5. **Tailwind Fixes** - Fixed all arbitrary width warnings by using standard Tailwind classes
6. **Environment Template** - Created `.env.local.example` for configuration reference

---

## Next Steps 🚀

### Step 1: Set Up Environment Variables

Create `.env.local` in the root directory with your database connection:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/jobwala"
JWT_SECRET="your-super-secret-key-min-32-chars-long"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Replace with your actual PostgreSQL credentials.

---

### Step 2: Install Dependencies

```bash
npm install @prisma/client bcryptjs jsonwebtoken dotenv
npm install --save-dev @types/jsonwebtoken
```

---

### Step 3: Generate Prisma Client

This regenerates TypeScript types based on the updated schema:

```bash
npx prisma generate
```

---

### Step 4: Create Initial Migration

This creates your database tables:

```bash
npx prisma migrate dev --name init
```

When prompted for a name, you can enter "init" or any descriptive name.

---

### Step 5: Build the App

```bash
npm run build
```

This will compile the app and verify no TypeScript errors remain.

---

### Step 6: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Testing the Auth Flow 🧪

1. **Register a new account:**
   - Go to `/auth`
   - Click "Register" tab
   - Fill in: First Name, Last Name, Username, Email, Password
   - Select role: **Candidate** or **Recruiter**
   - Click "Create Account"

2. **Login with your account:**
   - Click "Login" tab
   - Enter your email and password
   - Click "Sign In"
   - You'll be redirected based on role:
     - Candidate → `/jobs`
     - Recruiter → `/recruiter/dashboard`
     - Admin → `/admin`

---

## API Endpoints Ready 📡

The following API routes are now ready to use:

- `POST /api/users` - Register new user with selected role
- `POST /api/auth` - Login user and return JWT token
- `GET /api/users/profile` - Get user profile (with token)
- `PATCH /api/users/profile` - Update profile (with token)
- `DELETE /api/users/profile` - Clear profile data (with token)

---

## File Structure 📁

```
app/
├── store/
│   ├── useCandidateStore.ts      ✅ Candidate profile state
│   ├── useRecruiterStore.ts      ✅ Recruiter profile state
│   ├── useUserStore.ts           ✅ General user state
│   └── useSearchStore.ts         ✅ NEW - Search & filters state
├── api/
│   ├── auth/
│   │   └── route.ts              ✅ Login endpoint
│   └── users/
│       ├── route.ts              ✅ Register endpoint
│       └── profile/
│           └── route.ts          ✅ Profile management
├── auth/
│   ├── page.tsx                  ✅ Auth page (login/register)
│   └── login/
│       └── page.tsx              ✅ Alternate login page
└── ...

lib/
├── db.ts                          ✅ UPDATED - Prisma singleton
├── auth.ts                        ✅ UPDATED - Better Auth config
├── prisma.ts                      ✅ Existing Prisma instance
└── ...

prisma/
└── schema.prisma                  ✅ UPDATED - Added password field
```

---

## Common Issues & Solutions 🔧

### Issue: "Cannot find module '@prisma/client'"
**Solution:** Run `npm install @prisma/client` and `npx prisma generate`

### Issue: "DATABASE_URL is not set"
**Solution:** Create `.env.local` with your PostgreSQL connection string

### Issue: "ECONNREFUSED" when running migrations
**Solution:** Make sure PostgreSQL is running and connection string is correct

### Issue: "Password does not exist in type"
**Solution:** Run `npx prisma generate` to regenerate TypeScript types

---

## What's Included Now ✨

✅ User authentication (email/password)
✅ Role-based access (Candidate/Recruiter/Admin)
✅ Profile management for both roles
✅ Search functionality with filters
✅ Job card saving/bookmarking
✅ Form modals with validation and toast notifications
✅ Responsive design with Tailwind CSS
✅ TypeScript for type safety
✅ Zustand for state management

---

## Next Phase (Optional) 🎯

After everything works:
- Implement OAuth (Google/GitHub) in `lib/auth.ts`
- Add email verification
- Create job posting API endpoints
- Add application tracking system
- Implement notifications
- Add dashboard analytics

---

**All configuration files and code are ready! Just follow the steps above to get your app running.**
