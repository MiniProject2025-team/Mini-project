# Owner-Worker Platform - User Guide

## Welcome to the Owner-Worker Live Data Exchange & Analytics Platform!

This platform enables seamless real-time communication, file sharing, and data analytics between Owners and Workers.

## Getting Started

### 1. Registration

**Step 1**: Navigate to the registration page
- Click "Register here" on the login page

**Step 2**: Fill in your details
- **Username**: Choose a unique username (letters, numbers, and underscores only)
- **Password**: Create a secure password (minimum 6 characters)
- **Confirm Password**: Re-enter your password
- **Role Selection**: Choose your role:
  - **Owner**: Create rooms, view analytics, and manage workers
  - **Worker**: Join rooms, upload files, and communicate with owners

**Step 3**: Complete registration
- Click "Register" button
- You'll be redirected to the login page

### 2. Login

**Step 1**: Enter your credentials
- **Username**: Your registered username
- **Password**: Your password

**Step 2**: Access your dashboard
- Click "Login" button
- You'll be redirected to your role-specific dashboard

## For Owners

### Your Dashboard

When you login as an Owner, you'll see:
- **Your Owner ID**: A unique identifier displayed at the top (you can copy it)
- **Four main tabs**: Rooms, Workers, Files, and Analytics

### Creating a Room

**Step 1**: Get the Worker's ID
- Go to the "Workers" tab on your dashboard
- Find the worker you want to communicate with
- Click on the worker card to copy their Worker ID

**Step 2**: Create the room
- Go back to the "Rooms" tab
- Paste the Worker ID in the input field
- Click "Create Room"
- You'll be taken to the room immediately

### Communicating in a Room

**In the Room**:
- **Left Panel**: Real-time chat interface
  - Type messages in the input field at the bottom
  - Click the send button or press Enter
  - Messages appear instantly for both users
- **Right Panel**: Uploaded files
  - View all Excel files uploaded by the worker
  - Click download icon to save files locally

### Viewing Workers

**Workers Tab**:
- See all registered workers in the system
- View their usernames and unique IDs
- Check their registration dates
- **Click on any worker card to copy their Worker ID** for room creation

### Managing Files

**Files Tab**:
- View all Excel files uploaded by workers
- See filename, uploader, and upload date
- **View Chart**: Click to generate a bar chart from the Excel data
- **Download**: Click to download the original Excel file

### Analytics Dashboard

**Analytics Tab**:
- **Worker-wise Files**: See files grouped by each worker
- **Chart Visualization**: 
  - Click "View Chart" on any file in the Files tab
  - The chart will automatically display in the Analytics tab
  - Shows data from the first two columns of the Excel file
  - Displays up to 10 data points as an interactive bar chart
  - Hover over bars to see exact values
  - Chart updates in real-time when new files are uploaded

**Chart Requirements**:
- Excel file must have at least 2 columns
- Column 1: Text labels (names, categories, etc.)
- Column 2: Numeric values (sales, scores, quantities, etc.)
- See EXCEL_FILE_FORMAT.md for detailed format requirements

## For Workers

### Your Dashboard

When you login as a Worker, you'll see:
- **Your Worker ID**: A unique identifier displayed at the top (you can copy it)
- **Two main sections**: Join Room and My Files

### Joining a Room

**Step 1**: Get the Owner's username
- Ask your owner for their username (not their ID)

**Step 2**: Join the room
- Enter the owner's username in the input field
- Click "Join Room"
- You'll be taken to the room immediately

**Note**: The owner must create the room first before you can join

### Communicating in a Room

**In the Room**:
- **Left Panel**: Real-time chat interface
  - Type messages in the input field at the bottom
  - Click the send button or press Enter
  - Messages appear instantly for both users
- **Right Panel**: File upload and management
  - Click "Upload Excel File" button
  - Select an Excel file (.xlsx or .xls)
  - File uploads automatically
  - View all uploaded files in the list

### Uploading Files

**Requirements**:
- File format: .xlsx or .xls only
- Maximum size: 10MB
- Only workers can upload files
- **Excel Format**: Must have 2 columns (Column A: labels, Column B: numeric values)

**Steps**:
1. Go to a room with an owner
2. Click "Upload Excel File" in the right panel
3. Select your Excel file
4. Wait for upload confirmation
5. File appears in the list immediately

**📋 For detailed Excel file format requirements, see EXCEL_FILE_FORMAT.md**

**Excel File Format Tips**:
- First column: Names/labels
- Second column: Numeric values
- These will be used for chart generation

### Viewing Your Files

**My Uploaded Files Section**:
- See all files you've uploaded
- View which owner received each file
- Check upload dates and file sizes
- Download your files anytime

## Common Features

### Unique User IDs

**What is it?**
- A unique identifier assigned to every user
- Displayed prominently on your dashboard
- Can be copied by clicking the copy icon

**Why is it important?**
- Used for system identification
- Helps with troubleshooting
- Can be shared with support if needed

**Note**: Use usernames (not IDs) to create/join rooms

### Real-time Chat

**Features**:
- Instant message delivery
- Message history saved
- See sender's name and timestamp
- Your messages appear on the right (blue)
- Other user's messages appear on the left (gray)

### Room Status

**Active**: Room is operational and ready for communication

## Tips & Best Practices

### For Owners
1. **Go to Workers tab first** to find and copy Worker IDs
2. **Use Worker ID** (not username) to create rooms
3. **Click on worker cards** to automatically copy their IDs
4. **Check Analytics tab** regularly for new file uploads
5. **Download important files** for backup

### For Workers
1. **Get the owner's username** before trying to join
2. **Prepare Excel files** with proper formatting
3. **Check file size** before uploading (max 10MB)
4. **Use clear filenames** for easy identification
5. **Verify upload success** before closing the room

### Excel File Best Practices
1. **First column**: Use clear, descriptive labels
2. **Second column**: Use numeric values for charts
3. **Keep it simple**: First 10 rows will be used for charts
4. **Remove empty rows**: Clean data produces better charts
5. **Test small files first**: Ensure format is correct

## Troubleshooting

### Cannot Create/Join Room
- **Problem**: "User not found" error when creating room
- **Solution**: Make sure you're using the Worker ID (UUID format), not the username
- **Solution**: Copy the Worker ID from the Workers tab by clicking on the worker card
- **Solution**: Verify the ID is in UUID format (e.g., 123e4567-e89b-12d3-a456-426614174000)

- **Problem**: "User not found" error when joining room
- **Solution**: Make sure you're using the Owner's username, not the Owner ID
- **Solution**: Verify the username is spelled correctly

### File Upload Fails
- **Problem**: Upload button doesn't work
- **Solution**: Check file format (.xlsx or .xls only)
- **Solution**: Verify file size is under 10MB
- **Solution**: Make sure you're in a room as a worker

### Messages Not Appearing
- **Problem**: Messages don't show up
- **Solution**: Refresh the page
- **Solution**: Check your internet connection
- **Solution**: Make sure you're in the correct room

### Chart Not Displaying
- **Problem**: "View Chart" shows "No chart data to display"
- **Solution**: Ensure Excel file has at least 2 columns with data
- **Solution**: Check that Column A has text labels and Column B has numeric values
- **Solution**: Remove any empty rows between data
- **Solution**: Verify file format is .xlsx or .xls
- **Solution**: See EXCEL_FILE_FORMAT.md for detailed format requirements

- **Problem**: "Excel file is empty" error
- **Solution**: Make sure your Excel file has data starting from row 1
- **Solution**: Check that cells actually contain data (not just formatting)

- **Problem**: "No valid data found in Excel file" error
- **Solution**: Ensure Column B (second column) contains only numeric values
- **Solution**: Remove any text or special characters from the values column
- **Solution**: Format Column B as "Number" in Excel

- **Problem**: Chart shows but data looks wrong
- **Solution**: Check that your data is in the first two columns (A and B)
- **Solution**: Verify numeric values don't have text mixed in
- **Solution**: Try creating a simple test file with 3 rows of data

### Cannot Login
- **Problem**: "Invalid username or password"
- **Solution**: Double-check your username and password
- **Solution**: Remember usernames are case-sensitive
- **Solution**: Try registering again if you forgot credentials

## Security & Privacy

### Your Data
- All data is securely stored in Supabase
- Passwords are encrypted
- Files are stored securely
- Only authorized users can access rooms

### Access Control
- Owners can only see their own rooms and files
- Workers can only see rooms they're part of
- Files are only visible to room participants
- User IDs are unique and cannot be changed

## Support

If you encounter any issues:
1. Check this user guide first
2. Verify your internet connection
3. Try refreshing the page
4. Clear browser cache if problems persist
5. Contact your system administrator

## Keyboard Shortcuts

- **Enter**: Send message in chat
- **Ctrl/Cmd + C**: Copy user ID (when selected)

## Browser Compatibility

Recommended browsers:
- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

## Mobile Access

The platform is responsive and works on mobile devices:
- All features available on mobile
- Optimized layout for smaller screens
- Touch-friendly interface
- File upload supported on mobile browsers

---

**Thank you for using the Owner-Worker Platform!**

For the best experience, keep your browser updated and maintain a stable internet connection.
