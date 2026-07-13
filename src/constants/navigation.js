import { Home, Trophy, LayoutTemplate, History, Settings } from 'lucide-react';

export const SIDEBAR_LINKS = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Tournament Workspace', path: '/dashboard/tournaments', icon: Trophy },
  { name: 'Template Studio', path: '/dashboard/template-studio', icon: LayoutTemplate },
  { name: 'History', path: '/dashboard/history', icon: History },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];
