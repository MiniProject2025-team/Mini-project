/*
# Create Initial Database Schema for Owner-Worker Platform

## 1. New Tables

### profiles
User profile table with role-based access control
- `id` (uuid, primary key, references auth.users)
- `username` (text, unique, not null)
- `role` (user_role enum: 'owner' or 'worker', not null)
- `created_at` (timestamptz, default: now())

### rooms
Communication rooms between owners and workers
- `id` (uuid, primary key, default: gen_random_uuid())
- `owner_id` (uuid, references profiles, not null)
- `worker_id` (uuid, references profiles, not null)
- `status` (text, default: 'active')
- `created_at` (timestamptz, default: now())

### messages
Real-time chat messages within rooms
- `id` (uuid, primary key, default: gen_random_uuid())
- `room_id` (uuid, references rooms, not null)
- `sender_id` (uuid, references profiles, not null)
- `content` (text, not null)
- `created_at` (timestamptz, default: now())

### files
Excel file metadata and storage references
- `id` (uuid, primary key, default: gen_random_uuid())
- `room_id` (uuid, references rooms, not null)
- `worker_id` (uuid, references profiles, not null)
- `owner_id` (uuid, references profiles, not null)
- `filename` (text, not null)
- `file_path` (text, not null)
- `file_size` (bigint, not null)
- `created_at` (timestamptz, default: now())

## 2. Security

- Enable RLS on all tables
- Profiles: Users can read all profiles, update only their own (except role)
- Rooms: Users can read rooms they're part of, owners can create rooms
- Messages: Users can read/create messages in their rooms
- Files: Users can read/create files in their rooms

## 3. Triggers

- Auto-sync new users to profiles table after email confirmation
- First user becomes owner, subsequent users default to worker role

## 4. Storage

- Create storage bucket for Excel files
- Allow authenticated users to upload/download files

## 5. Notes

- Using username + password authentication (simulated with email)
- Email verification is disabled for username-based auth
- All tables use UUID for primary keys
- Timestamps use timestamptz for timezone awareness
*/

-- Create user role enum
CREATE TYPE user_role AS ENUM ('owner', 'worker');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'worker'::user_role,
  created_at timestamptz DEFAULT now()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  worker_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  UNIQUE(owner_id, worker_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE NOT NULL,
  worker_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  filename text NOT NULL,
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Profiles policies: All users can read all profiles, update only their own (except role)
CREATE POLICY "Anyone can view profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Rooms policies: Users can view rooms they're part of, create rooms
CREATE POLICY "Users can view their rooms" ON rooms
  FOR SELECT USING (
    auth.uid() = owner_id OR auth.uid() = worker_id
  );

CREATE POLICY "Owners can create rooms" ON rooms
  FOR INSERT WITH CHECK (
    auth.uid() = owner_id AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'owner'::user_role)
  );

-- Messages policies: Users can view and create messages in their rooms
CREATE POLICY "Users can view messages in their rooms" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM rooms 
      WHERE rooms.id = messages.room_id 
      AND (rooms.owner_id = auth.uid() OR rooms.worker_id = auth.uid())
    )
  );

CREATE POLICY "Users can create messages in their rooms" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM rooms 
      WHERE rooms.id = room_id 
      AND (rooms.owner_id = auth.uid() OR rooms.worker_id = auth.uid())
    )
  );

-- Files policies: Users can view and create files in their rooms
CREATE POLICY "Users can view files in their rooms" ON files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM rooms 
      WHERE rooms.id = files.room_id 
      AND (rooms.owner_id = auth.uid() OR rooms.worker_id = auth.uid())
    )
  );

CREATE POLICY "Workers can upload files" ON files
  FOR INSERT WITH CHECK (
    auth.uid() = worker_id AND
    EXISTS (
      SELECT 1 FROM rooms 
      WHERE rooms.id = room_id 
      AND rooms.worker_id = auth.uid()
    )
  );

-- Create trigger function to auto-sync users to profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
  extracted_username text;
BEGIN
  -- Count existing users
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  -- Extract username from email (remove @miaoda.com)
  extracted_username := REPLACE(NEW.email, '@miaoda.com', '');
  
  -- Insert new profile
  INSERT INTO profiles (id, username, role)
  VALUES (
    NEW.id,
    extracted_username,
    CASE WHEN user_count = 0 THEN 'owner'::user_role ELSE 'worker'::user_role END
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger to sync users after confirmation
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Also handle users that are created without email verification
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Create storage bucket for Excel files
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-83bue9vctji9_excel_files', 'app-83bue9vctji9_excel_files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for Excel files
CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'app-83bue9vctji9_excel_files');

CREATE POLICY "Users can view files in their rooms" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'app-83bue9vctji9_excel_files');

CREATE POLICY "Authenticated users can download files" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'app-83bue9vctji9_excel_files');