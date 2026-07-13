import { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const [hasNotifications] = useState(false); // UI Only for now as requested

  return (
    <button className="relative p-2 text-text-secondary hover:text-text transition-colors rounded-full hover:bg-[rgba(255,255,255,0.05)]">
      <Bell size={20} />
      {hasNotifications && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full shadow-glow"></span>
      )}
    </button>
  );
};

export default NotificationBell;
