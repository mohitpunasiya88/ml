import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../pages/dashboard/DashboardPage';
import NewProjectsPage from '../pages/projects/NewProjectsPage';
import SentToCEOPage from '../pages/projects/SentToCEOPage';
import ApprovedByClientPage from '../pages/projects/ApprovedByClientPage';
import InvoiceRaisedPage from '../pages/projects/InvoiceRaisedPage';
import CreateProjectPage from '../pages/projects/CreateProjectPage';
import ProjectDetailPage from '../pages/projects/ProjectDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects">
          <Route path="new" element={<NewProjectsPage />} />
          <Route path="sent-to-ceo" element={<SentToCEOPage />} />
          <Route path="approved-by-client" element={<ApprovedByClientPage />} />
          <Route path="invoice-raised" element={<InvoiceRaisedPage />} />
          <Route path="create" element={<CreateProjectPage />} />
          <Route path=":id" element={<ProjectDetailPage />} />
        </Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;