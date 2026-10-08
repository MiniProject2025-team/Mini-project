export type UserRole = 'owner' | 'worker';

export interface Profile {
  id: string;
  username: string;
  role: UserRole;
  created_at: string;
}

export interface Room {
  id: string;
  owner_id: string;
  worker_id: string;
  status: string;
  created_at: string;
}

export interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface FileRecord {
  id: string;
  room_id: string;
  worker_id: string;
  owner_id: string;
  filename: string;
  file_path: string;
  file_size: number;
  created_at: string;
}

export interface RoomWithProfiles extends Room {
  owner?: Profile;
  worker?: Profile;
}

export interface MessageWithSender extends Message {
  sender?: Profile;
}

export interface FileWithProfiles extends FileRecord {
  worker?: Profile;
  owner?: Profile;
}
