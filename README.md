# Nexachain MERN Investment and Referral Platform

This project implements the backend architecture, business logic, scheduler, and React dashboard for an investment and referral-based platform.

## Tech Stack

- MongoDB and Mongoose
- Express.js
- React.js with TypeScript and Vite
- Node.js with TypeScript
- JWT authentication
- node-cron scheduler

## Project Structure

```text
client/   React dashboard
server/   Express API, Mongoose models, business services, cron job
```

## Backend Setup

1. Start MongoDB locally.
2. Open a terminal in the backend folder:

```bash
cd server
npm install
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## Backend Environment Variables

Create `server/.env` from `server/.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexachain_assessment
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

## Frontend Setup

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs at the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

Optional frontend environment variable:

```env
VITE_API_URL=http://localhost:5000/api
```

If `VITE_API_URL` is not set, the app defaults to `http://localhost:5000/api`.

## API Documentation

All private routes require:

```http
Authorization: Bearer <jwt_token>
```

### Auth

#### Register

```http
POST /api/auth/register
Content-Type: application/json
```

Request:

```json
{
  "fullName": "Demo User",
  "email": "demo@example.com",
  "mobileNumber": "9999999999",
  "password": "secret123",
  "referralCode": "OPTIONAL_PARENT_CODE"
}
```

Response:

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {},
    "token": "jwt_token"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Request:

```json
{
  "email": "demo@example.com",
  "password": "secret123"
}
```

### Investments

#### Create Investment

```http
POST /api/investments
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

Request:

```json
{
  "investmentAmount": 10000,
  "planDetails": "Growth Plan",
  "startDate": "2026-06-07",
  "endDate": "2026-07-07",
  "dailyRoiPercentage": 1
}
```

#### View User Investments

```http
GET /api/investments?page=1&limit=10
Authorization: Bearer <jwt_token>
```

### Dashboard

```http
GET /api/dashboard
Authorization: Bearer <jwt_token>
```

Returns:

```json
{
  "totalInvestments": 1,
  "dailyRoi": 100,
  "totalRoiEarned": 100,
  "totalLevelIncomeEarned": 10,
  "walletBalance": 110
}
```

### ROI History

```http
GET /api/roi-history?page=1&limit=20
Authorization: Bearer <jwt_token>
```

### Referrals

#### Direct Referrals

```http
GET /api/referrals/direct
Authorization: Bearer <jwt_token>
```

#### Complete Referral Tree

```http
GET /api/referrals/tree
Authorization: Bearer <jwt_token>
```

### Referral Income History

```http
GET /api/referral-income-history?page=1&limit=20
Authorization: Bearer <jwt_token>
```

## Business Logic

- Daily ROI is calculated as `investmentAmount * dailyROIPercentage / 100`.
- ROI is stored in `ROIHistory`.
- User `walletBalance` and `totalROIEarned` are updated after ROI credit.
- Referral income is distributed upward through the referral hierarchy.
- Current level percentages are configured in `server/config/roi.config.ts`.
- Referral income is stored in `ReferralIncome`.

## Cron Job

The scheduler is registered when the backend starts.

- Schedule: every day at 12:00 AM Asia/Kolkata.
- It processes active investments.
- It credits ROI and referral income.
- It prevents overlapping execution with an in-memory lock.
- It prevents duplicate ROI for the same investment/date using a normalized processing date and a unique `ROIHistory` index.

## Assumptions

- Local development uses MongoDB at `mongodb://127.0.0.1:27017/nexachain_assessment`.
- Referral income is based on daily ROI amount.
- Only active parent users receive level income.
- Level percentages are `10%`, `5%`, and `2%` for levels 1, 2, and 3.
- The dashboard expects an existing JWT token in browser `localStorage` under the key `token`.

## Verification Commands

```bash
cd server
npm run build
```

```bash
cd client
npm run build
```
