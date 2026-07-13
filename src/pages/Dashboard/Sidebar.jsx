import { LogOut, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_LINKS } from '../../constants/navigation';
import { logoutUser } from '../../services/firebase/auth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Point<span className="text-primary">Fuze</span></h2>
          <button className="md:hidden text-text p-1 hover:bg-[rgba(255,255,255,0.05)] rounded-md" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav mt-4">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink 
                key={link.name}
                to={link.path}
                end={link.path === '/dashboard'}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar();
                }}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer mt-auto">
          <button className="sidebar-link w-full text-left text-error hover:bg-[rgba(239,68,68,0.1)] hover:text-error" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
