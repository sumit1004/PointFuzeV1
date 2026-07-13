import { useAuth } from '../../../hooks/useAuth';
import { User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Account Settings</h1>
        <p className="text-text-secondary">Manage your profile and application preferences.</p>
      </div>

      <div className="max-w-2xl flex flex-col gap-6">
        
        {/* Profile Card */}
        <div className="glass-panel p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <User className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Profile</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1">Email Address</label>
              <div className="bg-[#111] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] text-white">
                {user?.email}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1">User ID</label>
              <div className="bg-[#111] p-3 rounded-lg border border-[rgba(255,255,255,0.05)] text-text-secondary text-sm font-mono truncate">
                {user?.uid}
              </div>
            </div>
          </div>
        </div>

        {/* Preferences (Placeholder for future phases) */}
        <div className="glass-panel p-6 rounded-xl border border-[rgba(255,255,255,0.05)] opacity-50">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="text-text-secondary" size={24} />
            <h2 className="text-xl font-bold">Preferences</h2>
          </div>
          <p className="text-text-secondary text-sm">Theme and notification settings will be available in future updates.</p>
        </div>

        {/* Danger Zone */}
        <div className="glass-panel p-6 rounded-xl border border-[rgba(255,0,0,0.2)] bg-[rgba(255,0,0,0.02)]">
          <h2 className="text-xl font-bold text-error mb-2">Danger Zone</h2>
          <p className="text-text-secondary text-sm mb-6">Logging out will end your current session. Unsaved local drafts may not be available if cleared by your browser.</p>
          <button 
            onClick={handleLogout}
            className="btn bg-[rgba(255,0,0,0.1)] hover:bg-[rgba(255,0,0,0.2)] text-error border border-[rgba(255,0,0,0.2)] flex items-center gap-2"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
