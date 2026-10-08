import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/db/api';
import { supabase } from '@/db/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send, Upload, FileSpreadsheet, Download } from 'lucide-react';
import type { RoomWithProfiles, MessageWithSender, FileWithProfiles } from '@/types/types';

export default function Room() {
  const { roomId } = useParams<{ roomId: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [room, setRoom] = useState<RoomWithProfiles | null>(null);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [files, setFiles] = useState<FileWithProfiles[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!roomId || !user) return;
    loadRoomData();
    const unsubMessages = subscribeToMessages();
    const unsubFiles = subscribeToFiles();
    return () => {
      unsubMessages?.();
      unsubFiles?.();
    };
  }, [roomId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadRoomData = async () => {
    if (!roomId || !user) return;
    
    setLoading(true);
    try {
      const [roomData, messagesData, filesData] = await Promise.all([
        api.getRoom(roomId),
        api.getRoomMessages(roomId),
        api.getRoomFiles(roomId),
      ]);

      if (!roomData) {
        toast({
          title: 'Room Not Found',
          description: 'This room does not exist',
          variant: 'destructive',
        });
        navigate('/dashboard');
        return;
      }

      if (roomData.owner_id !== user.id && roomData.worker_id !== user.id) {
        toast({
          title: 'Access Denied',
          description: 'You do not have access to this room',
          variant: 'destructive',
        });
        navigate('/dashboard');
        return;
      }

      setRoom(roomData);
      setMessages(messagesData);
      setFiles(filesData);
    } catch (error: any) {
      console.error('Room load error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load room data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room-${roomId}-messages`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          const newMsg = payload.new as MessageWithSender;
          const sender = await api.getProfile(newMsg.sender_id);
          newMsg.sender = sender || undefined;
          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const subscribeToFiles = () => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room-${roomId}-files`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'files',
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          const newFile = payload.new as FileWithProfiles;
          const [worker, owner] = await Promise.all([
            api.getProfile(newFile.worker_id),
            api.getProfile(newFile.owner_id),
          ]);
          newFile.worker = worker || undefined;
          newFile.owner = owner || undefined;
          setFiles(prev => [newFile, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !roomId || !newMessage.trim()) return;

    setSending(true);
    try {
      await api.createMessage(roomId, user.id, newMessage.trim());
      setNewMessage('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !roomId || !room) return;

    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    
    if (!allowedExtensions.includes(fileExtension)) {
      toast({
        title: 'Invalid File Type',
        description: 'Only Excel files (.xlsx, .xls) are allowed',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'File size must be less than 10MB',
        variant: 'destructive',
      });
      return;
    }

    if (profile?.role !== 'worker') {
      toast({
        title: 'Permission Denied',
        description: 'Only workers can upload files',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const filePath = `${roomId}/${Date.now()}_${file.name}`;
      await api.uploadFile(file, filePath);
      await api.createFileRecord(
        roomId,
        user.id,
        room.owner_id,
        file.name,
        filePath,
        file.size
      );
      
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary p-4">
        <div className="container mx-auto max-w-6xl">
          <Skeleton className="h-12 w-48 mb-4 bg-muted" />
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Skeleton className="h-[600px] bg-muted" />
            </div>
            <Skeleton className="h-[600px] bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="p-8">
        <p className="mb-4">Could not load this room. Press F12 and check the Console for the error.</p>
        <Button onClick={() => navigate('/dashboard')}>Back to dashboard</Button>
      </div>
    );
  }

  const otherUser = room.owner_id === user?.id ? room.worker : room.owner;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto p-4 xl:p-8 max-w-7xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Room with {otherUser?.username}</h1>
              <p className="text-sm text-muted-foreground">
                {profile?.role === 'owner' ? 'Owner' : 'Worker'} View
              </p>
            </div>
            <Badge>{room.status}</Badge>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] xl:h-[500px] px-4">
                <div className="space-y-4 py-4">
                  {messages.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No messages yet. Start the conversation!
                    </p>
                  ) : (
                    messages.map((message) => {
                      const isOwn = message.sender_id === user?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-xs font-medium mb-1">
                              {message.sender?.username || 'Unknown'}
                            </p>
                            <p className="text-sm break-words">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sending}
                  />
                  <Button type="submit" disabled={sending || !newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.role === 'worker' && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Excel File'}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Only .xlsx and .xls files (max 10MB)
                  </p>
                </div>
              )}

              <ScrollArea className="h-[300px] xl:h-[400px]">
                <div className="space-y-2">
                  {files.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8 text-sm">
                      No files uploaded yet
                    </p>
                  ) : (
                    files.map((file) => (
                      <div
                        key={file.id}
                        className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <FileSpreadsheet className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.filename}</p>
                            <p className="text-xs text-muted-foreground">
                              By {file.worker?.username}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(file.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={async () => {
                              try {
                                const blob = await api.downloadFile(file.file_path);
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = file.filename;
                                a.click();
                                URL.revokeObjectURL(url);
                              } catch (error) {
                                toast({
                                  title: 'Error',
                                  description: 'Failed to download file',
                                  variant: 'destructive',
                                });
                              }
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}