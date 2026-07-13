export const validateTeams = (teamsData, methodId, maxPlayers) => {
  const errors = [];
  const warnings = [];
  const suggestions = [];
  
  const teamNames = new Set();
  const uids = new Set();
  
  // Polyfill for randomUUID if unavailable in older browsers, but modern ones have it
  const generateId = (prefix) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

  const sanitizedTeams = teamsData.map((team, tIndex) => {
    const tId = generateId('team');
    const tName = team.name ? team.name.trim() : `Team ${tIndex + 1}`;

    if (!team.name) {
      errors.push({ type: 'team', id: tId, message: `Row ${tIndex + 1} is missing a Team Name.` });
    }

    if (teamNames.has(tName.toLowerCase()) && team.name) {
      warnings.push({ type: 'team', id: tId, message: `Duplicate Team Name detected: ${tName}.` });
    } else {
      teamNames.add(tName.toLowerCase());
    }

    let parsedPlayers = [];

    // Method 1 (Excel + Players) needs deep player validation
    if (methodId === 'excel_players' && team.players) {
      parsedPlayers = team.players.map((p, pIndex) => {
        const pId = generateId('player');
        
        if (!p.ign) {
          warnings.push({ type: 'player', id: pId, teamId: tId, message: `Player ${pIndex + 1} missing IGN in team ${tName}.` });
        }
        
        if (!p.uid) {
          warnings.push({ type: 'player', id: pId, teamId: tId, message: `Player ${pIndex + 1} missing UID in team ${tName}.` });
        } else {
          if (uids.has(p.uid)) {
            errors.push({ type: 'player', id: pId, teamId: tId, message: `Duplicate UID found: ${p.uid} in team ${tName}.` });
          } else {
            uids.add(p.uid);
          }
        }

        return { ...p, id: pId, ign: p.ign || '', uid: p.uid || '' };
      });

      if (parsedPlayers.length < maxPlayers) {
        suggestions.push({ type: 'team', id: tId, message: `Team ${tName} has ${parsedPlayers.length}/${maxPlayers} players. Consider adding more.` });
      }
    }

    return {
      id: tId,
      name: tName,
      displayOrder: tIndex + 1,
      players: parsedPlayers
    };
  });

  return {
    isValid: errors.length === 0, // Warnings don't block
    errors,
    warnings,
    suggestions,
    sanitizedTeams
  };
};

export const parseManualTeams = (textBlock) => {
  if (!textBlock) return [];
  const lines = textBlock.split('\n');
  const uniqueTeams = new Set();
  const rawTeams = [];

  lines.forEach((line) => {
    const cleanLine = line.trim();
    if (cleanLine) {
      if (!uniqueTeams.has(cleanLine.toLowerCase())) {
        uniqueTeams.add(cleanLine.toLowerCase());
        rawTeams.push({ name: cleanLine, players: [] });
      }
    }
  });

  return rawTeams;
};
