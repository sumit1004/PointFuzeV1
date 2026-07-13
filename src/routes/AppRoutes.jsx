import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import PlaceholderPage from '../pages/Dashboard/PlaceholderPage';
import TournamentWorkspace from '../pages/Dashboard/Tournaments/TournamentWorkspace';
import CreateTournament from '../pages/Dashboard/Tournaments/CreateTournament';
import TournamentDetails from '../pages/Dashboard/Tournaments/TournamentDetails';
import TemplateWorkspace from '../pages/Dashboard/TemplateStudio/TemplateWorkspace';
import TemplateEditor from '../pages/Dashboard/TemplateStudio/TemplateEditor';
import History from '../pages/Dashboard/History/History';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        {/* Fullscreen Editor Route */}
        <Route path="/dashboard/template-studio/:templateId" element={<TemplateEditor />} />

        {/* Dashboard Layout Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tournaments" element={<TournamentWorkspace />} />
          <Route path="tournaments/create" element={<CreateTournament />} />
          <Route path="tournaments/:tournamentId" element={<TournamentDetails />} />
          <Route path="tournaments/:tournamentId/edit" element={<PlaceholderPage title="Edit Settings" />} />
          <Route path="template-studio" element={<TemplateWorkspace />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
