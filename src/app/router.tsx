import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './login/page';
import { DashboardPage } from './dashboard/page';
import { ProtectedRoute } from '@/guards/ProtectedRoute';
import { PublicRoute } from '@/guards/PublicRoute';
import { AuthProvider } from '@/contexts/AuthContext';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

