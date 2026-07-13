import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/firebase/auth';

const UserMenu = () => {
  const { user, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const username = userData?.username || user?.displayName || 'Organizer';
  const email = userData?.email || user?.email || '';
  const initial = username.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logoutUser();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-glow">
          {initial}
        </div>
        <div className="hidden md:flex flex-col items-start text-left">
          <span className="text-sm font-semibold leading-tight">{username}</span>
          <span className="text-xs text-text-secondary leading-tight max-w-[120px] truncate">{email}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 glass-panel rounded-lg shadow-lg border border-[rgba(255,255,255,0.1)] py-2 z-50 animate-fade-in">
          <div className="px-4 py-2 border-b border-[rgba(255,255,255,0.05)] md:hidden">
            <p className="text-sm font-semibold truncate">{username}</p>
            <p className="text-xs text-text-secondary truncate">{email}</p>
          </div>
          
          <div className="py-1">
            <Link 
              to="/dashboard/settings" 
              className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-[rgba(255,122,0,0.1)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} />
              <span>Settings</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-[rgba(239,68,68,0.1)] transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
