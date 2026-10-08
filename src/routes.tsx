import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import Room from './pages/Room';
import ProtectedRoute from './components/common/ProtectedRoute';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false,
  },
  {
    name: 'Register',
    path: '/register',
    element: <Register />,
    visible: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Owner Dashboard',
    path: '/owner-dashboard',
    element: (
      <ProtectedRoute>
        <OwnerDashboard />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Worker Dashboard',
    path: '/worker-dashboard',
    element: (
      <ProtectedRoute>
        <WorkerDashboard />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Room',
    path: '/room/:roomId',
    element: (
      <ProtectedRoute>
        <Room />
      </ProtectedRoute>
    ),
    visible: false,
  },
  {
    name: 'Home',
    path: '/',
    element: <Login />,
    visible: false,
  },
];

export default routes;
