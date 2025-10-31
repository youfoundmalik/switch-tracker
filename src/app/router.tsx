import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './login/page';
import { DashboardPage } from './dashboard/page';
import { ProtectedRoute } from '@/guards/ProtectedRoute';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
    </BrowserRouter>
  );
}

