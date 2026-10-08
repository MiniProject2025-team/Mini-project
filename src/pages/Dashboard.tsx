import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    
    if (!profile) {
      navigate('/login');
      return;
    }

    if (profile.role === 'owner') {
      navigate('/owner-dashboard', { replace: true });
    } else if (profile.role === 'worker') {
      navigate('/worker-dashboard', { replace: true });
    }
  }, [profile, loading, navigate]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="space-y-4 w-full max-w-md">
        <Skeleton className="h-12 w-full bg-muted" />
        <Skeleton className="h-32 w-full bg-muted" />
        <Skeleton className="h-32 w-full bg-muted" />
      </div>
    </div>
  );
}
