import { ArrowLeft, Save, Undo2, Redo2, MonitorPlay } from 'lucide-react';

const TemplateHeader = ({ template, onNameChange, onSave, onExit, undo, redo, canUndo, canRedo }) => {
  return (
    <div style={{ height: '64px', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={onExit} style={{ padding: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px', border: 'none', background: 'transparent' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
        <input 
          type="text" 
          value={template.metadata.name}
          onChange={(e) => onNameChange(e.target.value)}
          style={{ backgroundColor: 'transparent', fontSize: '1.125rem', fontWeight: 'bold', color: 'white', border: 'none', outline: 'none', padding: '0.25rem 0.5rem', width: '250px' }}
        />
        {template.metadata.isBuiltIn && (
          <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>Read Only</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button onClick={undo} disabled={!canUndo} style={{ padding: '0.5rem', color: canUndo ? 'white' : 'rgba(255,255,255,0.3)', cursor: canUndo ? 'pointer' : 'default', border: 'none', background: 'transparent' }}>
          <Undo2 size={18} />
        </button>
        <button onClick={redo} disabled={!canRedo} style={{ padding: '0.5rem', color: canRedo ? 'white' : 'rgba(255,255,255,0.3)', cursor: canRedo ? 'pointer' : 'default', border: 'none', background: 'transparent' }}>
          <Redo2 size={18} />
        </button>

        <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>

        <button className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MonitorPlay size={16} /> Preview
        </button>
        <button 
          onClick={onSave}
          disabled={template.metadata.isBuiltIn}
          className="btn btn-primary btn-sm shadow-glow"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Save size={16} /> Save Template
        </button>
      </div>
    </div>
  );
};

export default TemplateHeader;
