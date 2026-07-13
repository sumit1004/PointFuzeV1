import * as XLSX from 'xlsx';
import { GAME_LIST } from '../../constants/games';

export const downloadTemplate = (gameId) => {
  const game = GAME_LIST.find(g => g.id === gameId);
  const maxPlayers = game ? game.maxPlayersPerTeam : 4; // fallback

  const headers = ['Team Name'];
  for (let i = 1; i <= maxPlayers; i++) {
    headers.push(`Player ${i} IGN`);
    headers.push(`Player ${i} UID`);
  }

  // Add 5 dummy rows
  const dummyRows = [];
  for (let i = 1; i <= 5; i++) {
    const row = [`Team Alpha ${i}`];
    for (let p = 1; p <= maxPlayers; p++) {
      row.push(`Alpha_${i}_P${p}`);
      row.push(`100${i}00${p}`);
    }
    dummyRows.push(row);
  }

  const wsData = [headers, ...dummyRows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Auto-size columns slightly
  const colWidths = [{ wch: 20 }];
  for (let i = 1; i <= maxPlayers * 2; i++) {
    colWidths.push({ wch: 15 });
  }
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Teams Template');
  
  XLSX.writeFile(wb, `PointFuze_${game?.shortName || 'Tournament'}_Template.xlsx`);
};
