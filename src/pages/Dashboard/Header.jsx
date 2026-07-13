import { Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-text" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="text-h4">Overview</h1>
      </div>
      <div className="header-actions">
        {/* Actions like notifications can go here later */}
        <Button variant="primary" size="sm">+ New Tournament</Button>
      </div>
    </header>
  );
};

export default Header;
