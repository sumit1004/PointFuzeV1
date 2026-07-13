import { Menu } from 'lucide-react';
import Breadcrumb from '../../components/dashboard/Breadcrumb';
import UserMenu from '../../components/dashboard/UserMenu';
import NotificationBell from '../../components/dashboard/NotificationBell';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="dashboard-header">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-text p-1 hover:bg-[rgba(255,255,255,0.05)] rounded-md" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Breadcrumb />
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <NotificationBell />
        <div className="h-6 w-px bg-[rgba(255,255,255,0.1)] mx-1"></div>
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
