import { LogOut, Home, Trophy, Settings as SettingsIcon, LayoutTemplate, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/firebase/auth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Tournaments', path: '/tournaments', icon: <Trophy size={20} /> },
    { name: 'Templates', path: '/templates', icon: <LayoutTemplate size={20} /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> },
  ];

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
          <button className="md:hidden text-text" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-user">
          <p className="text-small">Welcome,</p>
          <p className="font-semibold">{user?.displayName || 'Organizer'}</p>
        </div>

        <nav className="sidebar-nav">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              to={link.path} 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link w-full text-left" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
