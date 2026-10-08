import { supabase } from './supabase';
import type { Profile, Room, Message, FileRecord, RoomWithProfiles, MessageWithSender, FileWithProfiles } from '@/types/types';

export const api = {
  // Profile operations
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getProfileByUsername(username: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getWorkers(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'worker')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // Room operations
  async createRoom(ownerId: string, workerId: string): Promise<Room> {
    const { data, error } = await supabase
      .from('rooms')
      .insert({
        owner_id: ownerId,
        worker_id: workerId,
        status: 'active'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getRoom(roomId: string): Promise<RoomWithProfiles | null> {
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        owner:profiles!rooms_owner_id_fkey(*),
        worker:profiles!rooms_worker_id_fkey(*)
      `)
      .eq('id', roomId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getRoomByUsers(ownerId: string, workerId: string): Promise<Room | null> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('owner_id', ownerId)
      .eq('worker_id', workerId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async getUserRooms(userId: string): Promise<RoomWithProfiles[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        owner:profiles!rooms_owner_id_fkey(*),
        worker:profiles!rooms_worker_id_fkey(*)
      `)
      .or(`owner_id.eq.${userId},worker_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // Message operations
  async createMessage(roomId: string, senderId: string, content: string): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        room_id: roomId,
        sender_id: senderId,
        content
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getRoomMessages(roomId: string): Promise<MessageWithSender[]> {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles(*)
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // File operations
  async createFileRecord(
    roomId: string,
    workerId: string,
    ownerId: string,
    filename: string,
    filePath: string,
    fileSize: number
  ): Promise<FileRecord> {
    const { data, error } = await supabase
      .from('files')
      .insert({
        room_id: roomId,
        worker_id: workerId,
        owner_id: ownerId,
        filename,
        file_path: filePath,
        file_size: fileSize
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getRoomFiles(roomId: string): Promise<FileWithProfiles[]> {
    const { data, error } = await supabase
      .from('files')
      .select(`
        *,
        worker:profiles!files_worker_id_fkey(*),
        owner:profiles!files_owner_id_fkey(*)
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getOwnerFiles(ownerId: string): Promise<FileWithProfiles[]> {
    const { data, error } = await supabase
      .from('files')
      .select(`
        *,
        worker:profiles!files_worker_id_fkey(*),
        owner:profiles!files_owner_id_fkey(*)
      `)
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async getWorkerFiles(workerId: string): Promise<FileWithProfiles[]> {
    const { data, error } = await supabase
      .from('files')
      .select(`
        *,
        worker:profiles!files_worker_id_fkey(*),
        owner:profiles!files_owner_id_fkey(*)
      `)
      .eq('worker_id', workerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  // Storage operations
  async uploadFile(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from('app-83bue9vctji9_excel_files')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    return data.path;
  },

  async downloadFile(path: string): Promise<Blob> {
    const { data, error } = await supabase.storage
      .from('app-83bue9vctji9_excel_files')
      .download(path);
    
    if (error) throw error;
    return data;
  },

  async getFileUrl(path: string): Promise<string> {
    const { data } = supabase.storage
      .from('app-83bue9vctji9_excel_files')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};
