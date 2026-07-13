import { LAYER_TYPES } from '../../../constants/templateConstants';
import { Type, Image, Square, LayoutTemplate, Trophy, ListOrdered } from 'lucide-react';

const WIDGETS = [
  { type: LAYER_TYPES.TEXT, icon: Type, label: 'Text Layer' },
  { type: LAYER_TYPES.IMAGE, icon: Image, label: 'Image Box' },
  { type: LAYER_TYPES.SHAPE, icon: Square, label: 'Shape' },
  { type: LAYER_TYPES.WIDGET_HEADER, icon: LayoutTemplate, label: 'Tournament Header', config: { showLogo: true, showDate: true } },
  { type: LAYER_TYPES.WIDGET_LEADERBOARD, icon: ListOrdered, label: 'Leaderboard Table', config: { rowCount: 16 } },
  { type: LAYER_TYPES.WIDGET_MVP, icon: Trophy, label: 'MVP Card', config: {} }
];

const TemplateSidebar = ({ template, onAddLayer, selectedLayerId, onSelectLayer }) => {
  return (
    <div style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', zIndex: 40 }}>
      
      {/* Widget Toolbox */}
      <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Add Widget</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {WIDGETS.map(widget => {
            const Icon = widget.icon;
            return (
              <button
                key={widget.type}
                onClick={() => onAddLayer(widget.type, widget.config)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
                title={widget.label}
              >
                <Icon size={20} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '10px', textAlign: 'center', lineHeight: '1.2', color: 'var(--text-secondary)' }}>{widget.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Panel */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Layers</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {[...template.layers].reverse().map(layer => (
            <div 
              key={layer.id}
              onClick={() => onSelectLayer(layer.id)}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: selectedLayerId === layer.id ? '1px solid var(--primary)' : '1px solid transparent', backgroundColor: selectedLayerId === layer.id ? 'rgba(255,122,0,0.1)' : 'rgba(255,255,255,0.02)', color: selectedLayerId === layer.id ? 'var(--primary)' : 'var(--text-secondary)' }}
            >
              {layer.name || layer.type}
            </div>
          ))}
          {template.layers.length === 0 && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem 0', opacity: 0.5 }}>No layers added</div>
          )}
        </div>
      </div>

    </div>
  );
};

export default TemplateSidebar;
