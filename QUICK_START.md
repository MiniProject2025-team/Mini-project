# Quick Start Guide - Owner-Worker Platform

## 🚀 For Owners

### Creating Your First Room (3 Easy Steps)

#### Step 1: View Workers
1. Login to your Owner Dashboard
2. Click on the **"Workers"** tab
3. You'll see a list of all registered workers

#### Step 2: Copy Worker ID
1. Find the worker you want to communicate with
2. **Click on their card** (anywhere on the card)
3. You'll see a toast notification: "Copied! Worker ID for [username] copied to clipboard"
4. The Worker ID is now in your clipboard

#### Step 3: Create Room
1. Click on the **"Rooms"** tab
2. **Paste** the Worker ID into the input field (Ctrl+V or Cmd+V)
3. Click **"Create Room"**
4. You'll be automatically taken to the room!

### 💡 Pro Tips
- The Worker ID is in UUID format (e.g., `123e4567-e89b-12d3-a456-426614174000`)
- You can see the full ID on the worker card in the Workers tab
- If you get an error, make sure you copied the entire ID
- Each Owner-Worker pair can only have one room

---

## 🚀 For Workers

### Joining a Room (2 Easy Steps)

#### Step 1: Get Owner Username
1. Ask your owner for their **username** (not their ID)
2. Make sure you have the correct spelling

#### Step 2: Join Room
1. Login to your Worker Dashboard
2. Enter the Owner's **username** in the input field
3. Click **"Join Room"**
4. You'll be taken to the room!

### 💡 Pro Tips
- Use the Owner's username, not their ID
- The owner must create the room first
- Usernames are case-sensitive
- You can see your own Worker ID at the top of your dashboard

---

## 📊 Using the Room

### Real-Time Chat
- Type your message in the input field at the bottom
- Press **Enter** or click the send button
- Messages appear instantly for both users
- Your messages are on the right (blue)
- Other user's messages are on the left (gray)

### File Upload (Workers Only)
1. Click **"Upload Excel File"** button
2. Select an Excel file (.xlsx or .xls)
3. Maximum file size: 10MB
4. File uploads automatically
5. Owner can see it immediately in their Analytics tab

### File Download (Both Users)
1. Find the file in the right panel
2. Click the download icon
3. File downloads to your computer

---

## 📈 Analytics (Owners Only)

### Viewing Charts

#### From Files Tab
1. Go to **"Files"** tab on your dashboard
2. Find the file you want to visualize
3. Click **"View Chart"**
4. Chart appears in the **"Analytics"** tab

#### Chart Features
- Shows data from first 2 columns of Excel file
- Displays up to 10 data points
- Interactive bar chart
- Hover to see exact values
- Real-time updates when new files are uploaded

### Excel File Requirements
- **Column 1**: Names/labels (text)
- **Column 2**: Values (numbers)
- **Example**:
  ```
  Product    | Sales
  Product A  | 150
  Product B  | 200
  Product C  | 175
  ```

---

## ❓ Common Issues

### "Worker Not Found" Error
- **Problem**: Invalid Worker ID
- **Solution**: Go to Workers tab and click on the worker card to copy their ID again
- **Check**: Make sure the ID is in UUID format (with dashes)

### "Room Already Exists" Error
- **Problem**: You already have a room with this worker
- **Solution**: Go to Rooms tab and click on the existing room
- **Note**: Each Owner-Worker pair can only have one room

### "Invalid Worker ID" Error
- **Problem**: ID format is incorrect
- **Solution**: The ID must be in UUID format (e.g., 123e4567-e89b-12d3-a456-426614174000)
- **Fix**: Copy the ID again from the Workers tab

### File Upload Fails
- **Check**: File format (.xlsx or .xls only)
- **Check**: File size (must be under 10MB)
- **Check**: You're in a room as a worker
- **Check**: Internet connection is stable

### Chart Not Showing
- **Check**: Excel file has data in first 2 columns
- **Check**: Second column contains numbers
- **Try**: Upload a different file to test
- **Refresh**: Reload the page

---

## 🎯 Best Practices

### For Owners
1. ✅ Always use the Workers tab to copy Worker IDs
2. ✅ Create rooms before asking workers to join
3. ✅ Check Analytics tab regularly for new uploads
4. ✅ Download important files for backup
5. ✅ Communicate with workers about file requirements

### For Workers
1. ✅ Get the correct Owner username before joining
2. ✅ Prepare Excel files with proper formatting
3. ✅ Test with small files first
4. ✅ Use descriptive filenames
5. ✅ Verify upload success before closing the room

### Excel Files
1. ✅ First column: Clear labels
2. ✅ Second column: Numeric values
3. ✅ Remove empty rows
4. ✅ Keep data clean and organized
5. ✅ Test with sample data first

---

## 📞 Need Help?

1. Check the **USER_GUIDE.md** for detailed instructions
2. Review the **DEPLOYMENT.md** for setup issues
3. Check browser console for error messages
4. Verify your internet connection
5. Try refreshing the page

---

## 🎉 You're Ready!

The platform is designed to be intuitive and easy to use. Follow these steps and you'll be communicating and sharing data in no time!

**Remember**:
- Owners use **Worker IDs** to create rooms
- Workers use **Owner usernames** to join rooms
- Click on worker cards to copy IDs
- Excel files must have data in first 2 columns

Happy collaborating! 🚀
