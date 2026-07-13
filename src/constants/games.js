export const SUPPORTED_GAMES = {
  FREE_FIRE: {
    id: 'free_fire',
    name: 'Free Fire',
    shortName: 'FF',
    maxPlayersPerTeam: 4,
    defaultMethod: 'excel_players',
  },
  BGMI: {
    id: 'bgmi',
    name: 'BGMI',
    shortName: 'BGMI',
    maxPlayersPerTeam: 4,
    defaultMethod: 'excel_players',
  },
  PUBG: {
    id: 'pubg',
    name: 'PUBG Mobile',
    shortName: 'PUBG',
    maxPlayersPerTeam: 4,
    defaultMethod: 'excel_players',
  },
  COD_MOBILE: {
    id: 'cod_mobile',
    name: 'COD Mobile',
    shortName: 'CODM',
    maxPlayersPerTeam: 5,
    defaultMethod: 'excel_players',
  },
  VALORANT: {
    id: 'valorant',
    name: 'Valorant',
    shortName: 'VALO',
    maxPlayersPerTeam: 5,
    defaultMethod: 'direct_score',
  }
};

export const GAME_LIST = Object.values(SUPPORTED_GAMES);
