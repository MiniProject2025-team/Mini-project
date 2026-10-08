# Owner-Worker Live Data Exchange & Analytics Web Application Requirements Document

## 1. Application Overview

### 1.1 Application Name
Owner-Worker Live Data Exchange & Analytics Platform

### 1.2 Application Description
A production-ready web application enabling real-time communication, Excel file transfer, storage, and automatic chart analytics between Owners and Workers. The system features role-based access control, live messaging, file management, and automated data visualization capabilities.

### 1.3 Deployment Constraint
Must be 100% deployable on FREE-TIER services only with ZERO paid tools or subscriptions.

## 2. Core Functional Requirements

### 2.1 User Registration & Authentication\n
#### Registration Fields
- Username
- Password (securely hashed)
- Role selection (Owner or Worker)
- System-generated Unique User ID (auto-created upon successful registration)

#### Login System
- Authentication using username + password
- Role-based access control\n- Secure session management

### 2.2 Owner Dashboard\n
#### Display Elements
- Owner's Unique ID (prominently displayed)
- Input field to enter Worker Unique ID\n- Button to create private Room/Session using Owner ID + Worker ID
- List of all connected Workers
- List of active Rooms
\n#### Analytical Dashboard Block
- Display uploaded Excel files
- Show converted Bar Charts
- Worker-wise data visualization
- File-wise analytics
- Real-time chart updates when new files are uploaded
- Clickable charts for detailed visualization
\n### 2.3 Worker Dashboard

#### Display Elements
- Worker's own Unique ID (prominently displayed)
- Input field to enter Owner ID
- Button to join Room
- Excel file upload interface
- Real-time chat panel

### 2.4 Real-Time Communication System

#### Features
- Live text chat between Owner and Worker
- Live Excel file transfer
- Instant message delivery using WebSocket/realtime engine
- Secure communication channel
- Message and file transfer history stored in database

### 2.5 File Upload & Storage System

#### File Handling
- Support for Excel formats: .xlsx and .xls
- Backend storage within website infrastructure
\n#### File Metadata
- Worker ID linkage
- Owner ID linkage
- Room ID linkage\n- Upload timestamp

#### Owner File Operations
- View uploaded files
- Download files
- Analyze file data

### 2.6 Automatic Excel to Bar Chart Conversion

#### Chart Generation
- Automatic Excel file parsing
- Data extraction from uploaded files
- Conversion to Bar Charts
\n#### Chart Organization
- Worker-wise categorization
- File-wise categorization
- Interactive chart interface

#### Chart Interaction
- Click to load detailed visualization
- Real-time updates when new Excel files are uploaded
\n## 3. Technical Architecture Requirements

### 3.1 System Components
- Frontend application\n- Backend server
- Database system
- Realtime communication engine
- File storage system\n- Chart rendering engine
\n### 3.2 Technical Constraints
- Must use only free-tier services
- No paid API keys required
- No paid hosting services
- No paid database services\n- Production-ready code quality
- Fully secure implementation
- Mobile-responsive design

### 3.3 Deliverables
- Complete folder structure
- Full source code (frontend and backend)
- Realtime socket implementation
- Excel parsing logic
- Bar chart rendering logic
- Database schema
- Authentication system
- Storage system implementation
- Environment setup documentation
- Deployment guide for free hosting platforms

## 4. User Flow\n
### 4.1 Registration & Login Flow
1. User registers with username, password, and role selection
2. System generates Unique User ID automatically
3. User logs in with credentials
4. System redirects to role-specific dashboard (Owner or Worker)

### 4.2 Room Creation & Connection Flow
1. Owner enters Worker Unique ID on dashboard
2. Owner clicks button to create Room/Session
3. Worker enters Owner ID on their dashboard
4. Worker clicks button to join Room
5. Real-time communication channel established

### 4.3 File Upload & Analysis Flow
1. Worker uploads Excel file through dashboard
2. File stored in backend with metadata (Worker ID, Owner ID, Room ID, timestamp)
3. Owner dashboard automatically renders bar charts from uploaded data
4. Owner views and analyzes worker data visually\n5. Owner can download original Excel files if needed

## 5. Design Style\n
### 5.1 Color Scheme
- Primary color: Professional blue (#2563EB) for trust and reliability
- Secondary color: Clean white (#FFFFFF) for clarity\n- Accent color: Success green (#10B981) for positive actions
- Alert color: Warning amber (#F59E0B) for notifications

### 5.2 Visual Details
- Rounded corners (8px border-radius) for modern feel
- Subtle shadows for depth and hierarchy
- Clean borders (1px solid) for component separation
- Minimalist icon style for intuitive navigation
\n### 5.3 Layout Structure
- Dashboard card-based layout for organized information display
- Sidebar navigation for role-specific menu items
- Grid layout for chart analytics display
- Responsive breakpoints for mobile, tablet, and desktop views

### 5.4 Interactive Elements
- Smooth hover transitions (0.3s ease)
- Clear button states (default, hover, active, disabled)
- Real-time loading indicators for file uploads and chart rendering
- Toast notifications for system feedback