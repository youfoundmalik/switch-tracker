import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './login/page';
import { DashboardPage } from './dashboard/page';
import { ProtectedRoute } from '@/guards/ProtectedRoute';
import { PublicRoute } from '@/guards/PublicRoute';
import { AuthProvider } from '@/providers/AuthProvider';
import { UserProvider } from '@/providers/UserProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <UserProvider>
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
        </UserProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

