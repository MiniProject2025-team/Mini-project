# Owner-Worker Live Data Exchange & Analytics Platform - Deployment Guide

## Overview
This is a production-ready web application for real-time communication, Excel file transfer, and automated analytics between Owners and Workers. The application is built with React, TypeScript, Tailwind CSS, and Supabase, and is designed to run entirely on FREE-TIER services.

## Technology Stack
- **Frontend**: React + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage, Realtime)
- **Charts**: Recharts
- **Excel Parsing**: xlsx

## Features
✅ User registration and authentication with role selection (Owner/Worker)
✅ Role-based dashboards with unique user IDs
✅ Real-time room creation and joining
✅ Live chat messaging with Supabase Realtime
✅ Excel file upload and storage
✅ Automatic Excel to bar chart conversion
✅ Worker-wise and file-wise analytics
✅ File download functionality
✅ Responsive design for desktop and mobile

## Prerequisites
- Node.js 18+ and pnpm installed
- A Supabase account (free tier)

## Environment Setup

The application is already configured with Supabase. The `.env` file contains:
```
VITE_SUPABASE_URL=https://ctzxjenbujpsuvygzzug.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_APP_ID=app-83bue9vctji9
```

## Database Schema

The application uses the following tables:
- **profiles**: User profiles with role (owner/worker)
- **rooms**: Communication rooms between owners and workers
- **messages**: Real-time chat messages
- **files**: Excel file metadata and references

Storage bucket: `app-83bue9vctji9_excel_files` for Excel file storage

## Local Development

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm run dev
```

3. Access the application at `http://localhost:5173`

## Free-Tier Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables from `.env`
5. Deploy

### Option 2: Netlify
1. Push your code to GitHub
2. Go to https://netlify.com
3. Import your repository
4. Build command: `pnpm run build`
5. Publish directory: `dist`
6. Add environment variables from `.env`
7. Deploy

### Option 3: Cloudflare Pages
1. Push your code to GitHub
2. Go to https://pages.cloudflare.com
3. Connect your repository
4. Build command: `pnpm run build`
5. Build output directory: `dist`
6. Add environment variables from `.env`
7. Deploy

## User Flow

### Registration
1. Navigate to `/register`
2. Enter username (letters, numbers, underscores only)
3. Create password (minimum 6 characters)
4. Select role: Owner or Worker
5. Click "Register"

### Owner Workflow
1. Login with credentials
2. View Owner Dashboard with unique Owner ID
3. Navigate to Workers tab
4. Click on a worker card to copy their Worker ID
5. Go back to Rooms tab and paste the Worker ID to create a room
6. Access room for real-time chat
7. View uploaded Excel files in Analytics tab
8. Click "View Chart" to see bar chart visualization
9. Download files as needed

### Worker Workflow
1. Login with credentials
2. View Worker Dashboard with unique Worker ID
3. Enter Owner's username to join a room
4. Access room for real-time chat
5. Upload Excel files (.xlsx, .xls) up to 10MB
6. View upload history

## File Upload Requirements
- **Supported formats**: .xlsx, .xls
- **Maximum size**: 10MB
- **Permissions**: Only workers can upload files
- **Storage**: Files are stored in Supabase Storage

## Real-time Features
- Live chat messaging using Supabase Realtime
- Instant file upload notifications
- Real-time chart updates when new files are uploaded
- Message history persistence

## Security Features
- Row Level Security (RLS) enabled on all tables
- Secure file storage with authenticated access
- Password hashing with Supabase Auth
- Role-based access control
- Protected routes with authentication guards

## Cost Breakdown (FREE TIER)
- **Supabase**: Free tier includes:
  - 500MB database space
  - 1GB file storage
  - 2GB bandwidth
  - Unlimited API requests
  - Real-time subscriptions
- **Hosting**: Free on Vercel/Netlify/Cloudflare Pages
- **Total Cost**: $0/month

## Troubleshooting

### Issue: Cannot login after registration
**Solution**: Make sure email verification is disabled in Supabase settings (already configured)

### Issue: File upload fails
**Solution**: Check file size (max 10MB) and format (.xlsx or .xls only)

### Issue: Real-time messages not appearing
**Solution**: Ensure Supabase Realtime is enabled in your project settings

### Issue: Charts not displaying
**Solution**: Ensure Excel file has data in first two columns (name and value)

## Support
For issues or questions, please check:
1. Supabase dashboard for database/storage issues
2. Browser console for frontend errors
3. Network tab for API request failures

## License
This project is provided as-is for production use on free-tier services.
