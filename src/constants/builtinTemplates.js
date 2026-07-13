import { TEMPLATE_CATEGORIES, CANVAS_PRESETS, LAYER_TYPES } from './templateConstants';

export const BUILT_IN_TEMPLATES = [
  {
    metadata: {
      id: 'preset_neon_match_169',
      name: 'Neon Match Result',
      category: TEMPLATE_CATEGORIES.MATCH_RESULT,
      isBuiltIn: true,
      thumbnail: ''
    },
    settings: {
      ...CANVAS_PRESETS['16:9'],
      backgroundColor: '#0a0a0a',
      backgroundImage: ''
    },
    layers: [
      {
        id: 'layer_header_1',
        type: LAYER_TYPES.WIDGET_HEADER,
        name: 'Tournament Header',
        style: { x: 50, y: 50, width: 1820, height: 150, zIndex: 1 },
        config: { showLogo: true, showDate: true, alignment: 'left', theme: 'neon' }
      },
      {
        id: 'layer_leaderboard_1',
        type: LAYER_TYPES.WIDGET_LEADERBOARD,
        name: 'Match Standings',
        style: { x: 50, y: 250, width: 1820, height: 700, zIndex: 2 },
        config: { rowCount: 16, columns: ['rank', 'team', 'kills', 'kp', 'pp', 'total'], theme: 'glassmorphism' }
      }
    ]
  },
  {
    metadata: {
      id: 'preset_classic_overall_11',
      name: 'Classic Overall (Insta)',
      category: TEMPLATE_CATEGORIES.OVERALL_RESULT,
      isBuiltIn: true,
      thumbnail: ''
    },
    settings: {
      ...CANVAS_PRESETS['1:1'],
      backgroundColor: '#111827',
      backgroundImage: ''
    },
    layers: [
      {
        id: 'layer_header_2',
        type: LAYER_TYPES.WIDGET_HEADER,
        name: 'Tournament Header',
        style: { x: 40, y: 40, width: 1000, height: 120, zIndex: 1 },
        config: { showLogo: false, showDate: false, alignment: 'center', theme: 'classic' }
      },
      {
        id: 'layer_text_1',
        type: LAYER_TYPES.TEXT,
        name: 'Title Text',
        content: 'OVERALL STANDINGS',
        style: { x: 40, y: 180, width: 1000, height: 60, fontSize: 48, color: '#f59e0b', fontFamily: 'Inter', fontWeight: '900', align: 'center', zIndex: 2 }
      },
      {
        id: 'layer_leaderboard_2',
        type: LAYER_TYPES.WIDGET_LEADERBOARD,
        name: 'Overall Standings',
        style: { x: 40, y: 260, width: 1000, height: 780, zIndex: 3 },
        config: { rowCount: 10, columns: ['rank', 'team', 'matches', 'total'], theme: 'solid' }
      }
    ]
  }
];
