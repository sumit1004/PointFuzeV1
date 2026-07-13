import { CANVAS_PRESETS, LAYER_TYPES } from '../../../constants/templateConstants';

const PropertiesPanel = ({ template, selectedLayerId, onUpdateLayer, onUpdateSettings }) => {
  const selectedLayer = template.layers.find(l => l.id === selectedLayerId);

  const handleCanvasChange = (e) => {
    const preset = CANVAS_PRESETS[e.target.value];
    if (preset) onUpdateSettings(preset);
  };

  const panelStyle = { width: '300px', borderLeft: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0a0a0a', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 40, overflowY: 'auto' };
  const labelStyle = { display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' };
  const inputStyle = { width: '100%', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '0.5rem', fontSize: '0.875rem', color: 'white' };
  const headerStyle = { fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' };

  if (!selectedLayer) {
    return (
      <div style={panelStyle}>
        <div>
          <h3 style={headerStyle}>Canvas Settings</h3>
          <label style={labelStyle}>Preset Size</label>
          <select 
            onChange={handleCanvasChange}
            style={{ ...inputStyle, marginBottom: '1rem' }}
            value={Object.keys(CANVAS_PRESETS).find(k => CANVAS_PRESETS[k].width === template.settings.width && CANVAS_PRESETS[k].height === template.settings.height) || ''}
          >
            <option value="" disabled>Custom</option>
            {Object.entries(CANVAS_PRESETS).map(([key, p]) => (
              <option key={key} value={key}>{p.name}</option>
            ))}
          </select>

          <label style={labelStyle}>Background Color</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="color" 
              value={template.settings.backgroundColor || '#0a0a0a'}
              onChange={(e) => onUpdateSettings({ backgroundColor: e.target.value })}
              style={{ width: '2rem', height: '2rem', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', padding: 0 }}
            />
            <input 
              type="text" 
              value={template.settings.backgroundColor || '#0a0a0a'}
              onChange={(e) => onUpdateSettings({ backgroundColor: e.target.value })}
              style={{ flex: 1, ...inputStyle }}
            />
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.5, fontStyle: 'italic' }}>
          Select a layer to edit properties.
        </div>
      </div>
    );
  }

  const { style, config } = selectedLayer;

  const updateStyle = (key, val) => {
    onUpdateLayer(selectedLayerId, { style: { ...style, [key]: val } });
  };

  const updateConfig = (key, val) => {
    onUpdateLayer(selectedLayerId, { config: { ...(config || {}), [key]: val } });
  };

  return (
    <div style={panelStyle}>
      <div>
        <h3 style={headerStyle}>Position & Size</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div>
            <label style={labelStyle}>X</label>
            <input type="number" value={style.x || 0} onChange={(e) => updateStyle('x', Number(e.target.value))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Y</label>
            <input type="number" value={style.y || 0} onChange={(e) => updateStyle('y', Number(e.target.value))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>W</label>
            <input type="number" value={style.width || 0} onChange={(e) => updateStyle('width', Number(e.target.value))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>H</label>
            <input type="number" value={style.height || 0} onChange={(e) => updateStyle('height', Number(e.target.value))} style={inputStyle} />
          </div>
        </div>
      </div>

      {selectedLayer.type === LAYER_TYPES.TEXT && (
        <div>
          <h3 style={headerStyle}>Text Content</h3>
          <textarea 
            value={selectedLayer.content || ''} 
            onChange={(e) => onUpdateLayer(selectedLayerId, { content: e.target.value })}
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            placeholder="Enter text or {{VARIABLES}}"
          />
        </div>
      )}

      {selectedLayer.type === LAYER_TYPES.WIDGET_HEADER && (
        <div>
          <h3 style={headerStyle}>Header Widget</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'white' }}>
            <input type="checkbox" checked={config?.showLogo ?? true} onChange={(e) => updateConfig('showLogo', e.target.checked)} />
            Show Organizer Logo
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'white' }}>
            <input type="checkbox" checked={config?.showDate ?? true} onChange={(e) => updateConfig('showDate', e.target.checked)} />
            Show Date
          </label>
        </div>
      )}
      
      {selectedLayer.type === LAYER_TYPES.WIDGET_LEADERBOARD && (
        <div>
          <h3 style={headerStyle}>Leaderboard Widget</h3>
          <label style={labelStyle}>Row Count</label>
          <input type="number" min="1" max="50" value={config?.rowCount || 16} onChange={(e) => updateConfig('rowCount', Number(e.target.value))} style={{ ...inputStyle, marginBottom: '1rem' }} />
          
          <label style={labelStyle}>Theme</label>
          <select value={config?.theme || 'glassmorphism'} onChange={(e) => updateConfig('theme', e.target.value)} style={inputStyle}>
            <option value="glassmorphism">Glassmorphism</option>
            <option value="solid">Solid Black</option>
            <option value="minimal">Minimal Lines</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
