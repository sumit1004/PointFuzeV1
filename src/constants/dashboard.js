import { Trophy, Image as ImageIcon, Plus } from 'lucide-react';

export const DEFAULT_STATS = [
  { id: 'total_tournaments', label: 'Total Tournaments', value: 0 },
  { id: 'total_matches', label: 'Matches Played', value: 0 },
  { id: 'total_images', label: 'Images Generated', value: 0 },
];

export const QUICK_ACTIONS = [
  { label: 'Create Tournament', path: '/dashboard/create-tournament', icon: Plus, variant: 'primary' },
  { label: 'Template Studio', path: '/dashboard/template-studio', icon: ImageIcon, variant: 'secondary' },
  { label: 'View History', path: '/dashboard/history', icon: Trophy, variant: 'ghost' },
];
