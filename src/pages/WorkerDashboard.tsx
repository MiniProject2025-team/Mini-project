import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/db/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import UserIdDisplay from '@/components/common/UserIdDisplay';
import { MessageSquare, FileSpreadsheet } from 'lucide-react';
import type { RoomWithProfiles, FileWithProfiles } from '@/types/types';

export default function WorkerDashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ownerUsername, setOwnerUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<RoomWithProfiles[]>([]);
  const [files, setFiles] = useState<FileWithProfiles[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (profile?.role !== 'worker') {
      navigate('/dashboard');
      return;
    }
    loadData();
  }, [profile, navigate]);

  const loadData = async () => {
    if (!user) return;
    
    setLoadingData(true);
    try {
      const [roomsData, filesData] = await Promise.all([
        api.getUserRooms(user.id),
        api.getWorkerFiles(user.id),
      ]);
      setRooms(roomsData);
      setFiles(filesData);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!user || !ownerUsername.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter an owner username',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const owner = await api.getProfileByUsername(ownerUsername.trim());
      
      if (!owner) {
        toast({
          title: 'Owner Not Found',
          description: 'No owner found with this username',
          variant: 'destructive',
        });
        return;
      }

      if (owner.role !== 'owner') {
        toast({
          title: 'Invalid Role',
          description: 'This user is not an owner',
          variant: 'destructive',
        });
        return;
      }

      const existingRoom = await api.getRoomByUsers(owner.id, user.id);
      if (!existingRoom) {
        toast({
          title: 'Room Not Found',
          description: 'No room exists with this owner. Ask the owner to create a room first.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Joining room',
      });
      setOwnerUsername('');
      navigate(`/room/${existingRoom.id}`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to join room',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto p-4 xl:p-8 space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Worker Dashboard</h1>
            <p className="text-muted-foreground">Join rooms and upload files</p>
          </div>
        </div>

        <UserIdDisplay userId={user.id} label="Your Worker ID" />

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Join Room</CardTitle>
                <CardDescription>Enter an owner's username to join their room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerUsername">Owner Username</Label>
                  <Input
                    id="ownerUsername"
                    placeholder="Enter owner username"
                    value={ownerUsername}
                    onChange={(e) => setOwnerUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button onClick={handleJoinRoom} disabled={loading} className="w-full">
                  {loading ? 'Joining...' : 'Join Room'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <MessageSquare className="h-5 w-5 inline mr-2" />
                  My Rooms ({rooms.length})
                </CardTitle>
                <CardDescription>Your active communication rooms</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 bg-muted" />)}
                  </div>
                ) : rooms.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No rooms yet. Join a room to get started!</p>
                ) : (
                  <div className="space-y-2">
                    {rooms.map(room => (
                      <div
                        key={room.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/room/${room.id}`)}
                      >
                        <div>
                          <p className="font-medium">Room with {room.owner?.username}</p>
                          <p className="text-sm text-muted-foreground">
                            Created {new Date(room.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge>{room.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                <FileSpreadsheet className="h-5 w-5 inline mr-2" />
                My Uploaded Files ({files.length})
              </CardTitle>
              <CardDescription>Excel files you've uploaded</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 bg-muted" />)}
                </div>
              ) : files.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No files uploaded yet</p>
              ) : (
                <div className="space-y-2">
                  {files.map(file => (
                    <div
                      key={file.id}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            To {file.owner?.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(file.created_at).toLocaleDateString()} • {(file.file_size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
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
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
