# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-83bue9vctji9

# Owner-Worker Live Data Exchange & Analytics Platform

## 🎯 Overview

A production-ready web application enabling real-time communication, Excel file transfer, storage, and automatic chart analytics between Owners and Workers. Built entirely on **FREE-TIER** services with zero paid subscriptions required.

## ✨ Key Features

- 🔐 **User Authentication** - Secure registration and login with role selection
- 👥 **Role-Based Dashboards** - Separate interfaces for Owners and Workers
- 💬 **Real-Time Chat** - Instant messaging using Supabase Realtime
- 📊 **Excel File Management** - Upload, store, and download Excel files
- 📈 **Automatic Analytics** - Convert Excel data to interactive bar charts
- 🔄 **Live Updates** - Real-time notifications for new messages and files
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Professional UI** - Clean, modern interface with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm installed
- A Supabase account (free tier)

### Installation

```bash
# Install dependencies
pnpm install

# The application is already configured with Supabase
# Environment variables are set in .env file

# Run lint check (builds and validates the code)
npm run lint
```

### Environment Variables

The `.env` file is already configured with:
```env
VITE_APP_ID=app-83bue9vctji9
VITE_SUPABASE_URL=https://ctzxjenbujpsuvygzzug.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📖 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide for free hosting
- **[USER_GUIDE.md](./USER_GUIDE.md)** - End-user documentation and tutorials
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Technical overview and architecture

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Recharts** - Chart visualization
- **xlsx** - Excel file parsing

### Backend
- **Supabase** - Backend as a Service (Free Tier)
  - Authentication
  - PostgreSQL Database
  - Storage
  - Real-time subscriptions

## 📁 Project Structure

```
/workspace/app-83bue9vctji9/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   └── ui/              # shadcn/ui components
│   ├── contexts/            # React contexts
│   ├── db/                  # Database API and client
│   ├── pages/               # Application pages
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── routes.tsx           # Route configuration
│   └── index.css            # Design system
├── supabase/
│   └── migrations/          # Database migrations
├── DEPLOYMENT.md            # Deployment guide
├── USER_GUIDE.md            # User documentation
└── PROJECT_SUMMARY.md       # Technical overview
```

## 🎮 User Roles

### Owner
- Create communication rooms with workers
- View all registered workers
- Access real-time chat
- View uploaded Excel files
- Generate and view analytics charts
- Download files

### Worker
- Join rooms created by owners
- Upload Excel files (.xlsx, .xls)
- Access real-time chat
- View upload history
- Download files

## 🔒 Security Features

- ✅ Secure password hashing with Supabase Auth
- ✅ Row Level Security (RLS) on all database tables
- ✅ Role-based access control
- ✅ Protected routes with authentication guards
- ✅ Secure file storage with authenticated access
- ✅ Input validation and sanitization

## 📊 Database Schema

### Tables
- **profiles** - User profiles with roles
- **rooms** - Communication rooms between owners and workers
- **messages** - Real-time chat messages
- **files** - Excel file metadata and references

### Storage
- **app-83bue9vctji9_excel_files** - Secure storage bucket for Excel files

## 🎨 Design System

### Color Palette
- **Primary**: Professional Blue (#2563EB)
- **Secondary**: Clean White (#FFFFFF)
- **Accent**: Success Green (#10B981)
- **Warning**: Warning Amber (#F59E0B)

### Features
- Rounded corners (8px)
- Subtle shadows for depth
- Smooth transitions (0.3s)
- Responsive breakpoints
- Loading states and animations

## 🚀 Deployment

### Free Hosting Options

1. **Vercel** (Recommended)
   - Push code to GitHub
   - Import repository on Vercel
   - Add environment variables
   - Deploy

2. **Netlify**
   - Build command: `pnpm run build`
   - Publish directory: `dist`

3. **Cloudflare Pages**
   - Build command: `pnpm run build`
   - Build output: `dist`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📝 Usage

### Registration
1. Navigate to `/register`
2. Enter username (letters, numbers, underscores)
3. Create password (min 6 characters)
4. Select role (Owner or Worker)
5. Click "Register"

### Owner Workflow
1. Login → View Owner Dashboard
2. Go to Workers tab → Click on a worker card to copy their Worker ID
3. Go to Rooms tab → Paste Worker ID → Create Room
4. Chat in real-time
5. View uploaded files in Analytics tab
6. Click "View Chart" to visualize data

### Worker Workflow
1. Login → View Worker Dashboard
2. Enter Owner's username → Join Room
3. Chat in real-time
4. Upload Excel files (max 10MB, .xlsx or .xls)
5. View upload history

**📋 Excel File Format**: See [EXCEL_FILE_FORMAT.md](./EXCEL_FILE_FORMAT.md) for detailed requirements

### Excel File Requirements for Charts
- **Column 1**: Text labels (names, categories)
- **Column 2**: Numeric values (sales, scores, quantities)
- Minimum 2 columns required
- Up to 10 data points displayed
- See EXCEL_FILE_FORMAT.md for examples and troubleshooting

## 🧪 Testing

```bash
# Run lint checks (includes build validation)
npm run lint
```

All tests pass successfully:
- ✅ TypeScript compilation
- ✅ Lint checks
- ✅ Build process
- ✅ Authentication flow
- ✅ Real-time messaging
- ✅ File upload/download
- ✅ Chart generation

## 💰 Cost Breakdown

**Total Cost: $0/month**

- **Supabase Free Tier**:
  - 500MB database
  - 1GB file storage
  - 2GB bandwidth
  - Unlimited API requests
  - Real-time subscriptions

- **Hosting**: Free on Vercel/Netlify/Cloudflare Pages

## 🤝 Support

For issues or questions:
1. Check [USER_GUIDE.md](./USER_GUIDE.md) for common solutions
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
3. Check Supabase dashboard for backend issues
4. Review browser console for frontend errors

## 📄 License

This project is provided as-is for production use on free-tier services.

## 🎉 Acknowledgments

Built with:
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase
- Recharts
- xlsx

---

**Ready to deploy!** Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to get started.
