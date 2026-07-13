import { LAYER_TYPES } from '../../constants/templateConstants';

/**
 * The Template Compiler acts as middleware between the Template Editor and the Export Renderer.
 * It takes a raw layout JSON and a data payload, injecting variables and structuring for painting.
 */

export const compileTemplate = (templateJson, dataPayload) => {
  const compiledLayers = templateJson.layers.map(layer => {
    switch (layer.type) {
      case LAYER_TYPES.TEXT:
        return compileTextLayer(layer, dataPayload);
      case LAYER_TYPES.WIDGET_HEADER:
        return compileHeaderWidget(layer, dataPayload);
      case LAYER_TYPES.WIDGET_LEADERBOARD:
        return compileLeaderboardWidget(layer, dataPayload);
      default:
        return layer;
    }
  });

  return {
    settings: templateJson.settings,
    layers: compiledLayers
  };
};

const replaceVariables = (str, dataPayload) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    return dataPayload[key] !== undefined ? dataPayload[key] : match;
  });
};

const compileTextLayer = (layer, dataPayload) => {
  return {
    ...layer,
    content: replaceVariables(layer.content, dataPayload)
  };
};

const compileHeaderWidget = (layer, dataPayload) => {
  // A widget doesn't just replace text; it dynamically expands into sub-layers 
  // depending on its configuration (e.g. if showDate is false, it removes the date sub-layer)
  const subLayers = [];
  
  subLayers.push({
    id: `${layer.id}_title`,
    type: LAYER_TYPES.TEXT,
    content: replaceVariables('{{TOURNAMENT_NAME}}', dataPayload),
    style: { ...layer.style, fontSize: 64, fontWeight: '900', color: '#ffffff' }
  });

  if (layer.config.showDate) {
    subLayers.push({
      id: `${layer.id}_date`,
      type: LAYER_TYPES.TEXT,
      content: replaceVariables('{{MATCH_DATE}}', dataPayload),
      style: { ...layer.style, y: layer.style.y + 70, fontSize: 24, color: '#aaaaaa' }
    });
  }

  return {
    ...layer,
    compiledSubLayers: subLayers
  };
};

const compileLeaderboardWidget = (layer, dataPayload) => {
  // This would take the actual tournament leaderboard data from dataPayload.leaderboard
  // and map it into rows of text/image layers exactly spaced out.
  // For now, we mock the injection.
  const { rowCount } = layer.config;
  const mockRows = dataPayload.leaderboard || Array.from({ length: rowCount }).map((_, i) => ({
    rank: i + 1,
    team: `Team ${i + 1}`,
    kills: Math.floor(Math.random() * 20),
    total: Math.floor(Math.random() * 50) + 10
  }));

  const rowHeight = layer.style.height / rowCount;
  const subLayers = [];

  mockRows.slice(0, rowCount).forEach((row, i) => {
    const yOffset = layer.style.y + (i * rowHeight);
    
    subLayers.push({
      id: `${layer.id}_row_${i}_rank`,
      type: LAYER_TYPES.TEXT,
      content: row.rank.toString(),
      style: { ...layer.style, y: yOffset, x: layer.style.x + 20, fontSize: 32 }
    });
    
    subLayers.push({
      id: `${layer.id}_row_${i}_team`,
      type: LAYER_TYPES.TEXT,
      content: row.team,
      style: { ...layer.style, y: yOffset, x: layer.style.x + 100, fontSize: 32 }
    });
    
    subLayers.push({
      id: `${layer.id}_row_${i}_total`,
      type: LAYER_TYPES.TEXT,
      content: row.total.toString(),
      style: { ...layer.style, y: yOffset, x: layer.style.x + layer.style.width - 100, fontSize: 32, color: '#ff7a00' }
    });
  });

  return {
    ...layer,
    compiledSubLayers: subLayers
  };
};
