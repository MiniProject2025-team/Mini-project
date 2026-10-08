import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/db/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import UserIdDisplay from '@/components/common/UserIdDisplay';
import { Users, MessageSquare, BarChart3, FileSpreadsheet, Copy } from 'lucide-react';
import type { Profile, RoomWithProfiles, FileWithProfiles } from '@/types/types';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function OwnerDashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workerId, setWorkerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState<Profile[]>([]);
  const [rooms, setRooms] = useState<RoomWithProfiles[]>([]);
  const [files, setFiles] = useState<FileWithProfiles[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileWithProfiles | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.role !== 'owner') {
      navigate('/dashboard');
      return;
    }
    loadData();
  }, [profile, navigate]);

  const loadData = async () => {
    if (!user) return;
    
    setLoadingData(true);
    try {
      const [workersData, roomsData, filesData] = await Promise.all([
        api.getWorkers(),
        api.getUserRooms(user.id),
        api.getOwnerFiles(user.id),
      ]);
      setWorkers(workersData);
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

  const handleCreateRoom = async () => {
    if (!user || !workerId.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a worker ID',
        variant: 'destructive',
      });
      return;
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(workerId.trim())) {
      toast({
        title: 'Invalid Worker ID',
        description: 'Please enter a valid Worker ID (UUID format)',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const worker = await api.getProfile(workerId.trim());
      
      if (!worker) {
        toast({
          title: 'Worker Not Found',
          description: 'No worker found with this ID',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (worker.role !== 'worker') {
        toast({
          title: 'Invalid Role',
          description: 'This user is not a worker',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      const existingRoom = await api.getRoomByUsers(user.id, worker.id);
      if (existingRoom) {
        toast({
          title: 'Room Exists',
          description: 'A room with this worker already exists',
        });
        navigate(`/room/${existingRoom.id}`);
        setLoading(false);
        return;
      }

      const room = await api.createRoom(user.id, worker.id);
      toast({
        title: 'Success',
        description: 'Room created successfully',
      });
      setWorkerId('');
      navigate(`/room/${room.id}`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create room',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const parseExcelFile = async (file: FileWithProfiles) => {
    try {
      setSelectedFile(file);
      setChartData([]);
      
      const blob = await api.downloadFile(file.file_path);
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        toast({
          title: 'Error',
          description: 'Excel file has no sheets',
          variant: 'destructive',
        });
        return;
      }
      
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      
      if (!jsonData || jsonData.length === 0) {
        toast({
          title: 'Error',
          description: 'Excel file is empty',
          variant: 'destructive',
        });
        return;
      }
      
      // Skip header row if it exists, take up to 10 data rows
      const dataRows = jsonData.filter(row => Array.isArray(row) && row.length >= 2);
      
      if (dataRows.length === 0) {
        toast({
          title: 'Error',
          description: 'Excel file must have at least 2 columns with data',
          variant: 'destructive',
        });
        return;
      }
      
      const formattedData = dataRows.slice(0, 10).map((row: any, index) => {
        const name = row[0] !== undefined && row[0] !== null ? String(row[0]) : `Row ${index + 1}`;
        const value = row[1] !== undefined && row[1] !== null ? Number(row[1]) : 0;
        
        return {
          name: name,
          value: isNaN(value) ? 0 : value,
        };
      }).filter(item => item.value !== 0 || item.name !== '');
      
      if (formattedData.length === 0) {
        toast({
          title: 'Error',
          description: 'No valid data found in Excel file. Ensure column 1 has labels and column 2 has numbers.',
          variant: 'destructive',
        });
        return;
      }
      
      setChartData(formattedData);
      
      // Switch to Analytics tab after successful parsing
      const analyticsTab = document.querySelector('[value="analytics"]') as HTMLElement;
      if (analyticsTab) {
        analyticsTab.click();
      }
      
      toast({
        title: 'Success',
        description: `Chart generated with ${formattedData.length} data points`,
      });
    } catch (error: any) {
      console.error('Excel parsing error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to parse Excel file',
        variant: 'destructive',
      });
      setChartData([]);
    }
  };

  const groupFilesByWorker = () => {
    const grouped: { [key: string]: FileWithProfiles[] } = {};
    files.forEach(file => {
      const workerName = file.worker?.username || 'Unknown';
      if (!grouped[workerName]) {
        grouped[workerName] = [];
      }
      grouped[workerName].push(file);
    });
    return grouped;
  };

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto p-4 xl:p-8 space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-muted-foreground">Manage workers, rooms, and analytics</p>
          </div>
        </div>

        <UserIdDisplay userId={user.id} label="Your Owner ID" />

        <Tabs defaultValue="rooms" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 xl:grid-cols-4">
            <TabsTrigger value="rooms">
              <MessageSquare className="h-4 w-4 mr-2" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="workers">
              <Users className="h-4 w-4 mr-2" />
              Workers
            </TabsTrigger>
            <TabsTrigger value="files">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Room</CardTitle>
                <CardDescription>Enter a worker's ID to create a communication room</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col xl:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="workerId">Worker ID</Label>
                    <Input
                      id="workerId"
                      placeholder="Enter worker ID (UUID)"
                      value={workerId}
                      onChange={(e) => setWorkerId(e.target.value)}
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Copy the Worker ID from the Workers tab below
                    </p>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleCreateRoom} disabled={loading} className="w-full xl:w-auto">
                      {loading ? 'Creating...' : 'Create Room'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Rooms ({rooms.length})</CardTitle>
                <CardDescription>Your communication rooms with workers</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 bg-muted" />)}
                  </div>
                ) : rooms.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No rooms yet. Create one to get started!</p>
                ) : (
                  <div className="space-y-2">
                    {rooms.map(room => (
                      <div
                        key={room.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/room/${room.id}`)}
                      >
                        <div>
                          <p className="font-medium">Room with {room.worker?.username}</p>
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
          </TabsContent>

          <TabsContent value="workers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Workers ({workers.length})</CardTitle>
                <CardDescription>List of registered workers - Click to copy Worker ID</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 bg-muted" />)}
                  </div>
                ) : workers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No workers registered yet</p>
                ) : (
                  <div className="grid gap-4 xl:grid-cols-2">
                    {workers.map(worker => (
                      <div 
                        key={worker.id} 
                        className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(worker.id);
                            toast({
                              title: 'Copied!',
                              description: `Worker ID for ${worker.username} copied to clipboard`,
                            });
                          } catch (error) {
                            toast({
                              title: 'Failed to copy',
                              description: 'Please copy manually',
                              variant: 'destructive',
                            });
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{worker.username}</p>
                            <Badge variant="outline">{worker.role}</Badge>
                          </div>
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground font-mono break-all">{worker.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files ({files.length})</CardTitle>
                <CardDescription>Excel files uploaded by workers</CardDescription>
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
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            By {file.worker?.username} • {new Date(file.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => parseExcelFile(file)}
                          >
                            View Chart
                          </Button>
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Worker-wise Files</CardTitle>
                  <CardDescription>Files grouped by worker</CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.entries(groupFilesByWorker()).map(([workerName, workerFiles]) => (
                    <div key={workerName} className="mb-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{workerName}</p>
                        <Badge>{workerFiles.length} files</Badge>
                      </div>
                      <div className="space-y-1">
                        {workerFiles.map(file => (
                          <p key={file.id} className="text-sm text-muted-foreground truncate">
                            • {file.filename}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chart Visualization</CardTitle>
                  <CardDescription>
                    {selectedFile ? `Viewing: ${selectedFile.filename}` : 'Click "View Chart" on any file to visualize'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No chart data to display
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
