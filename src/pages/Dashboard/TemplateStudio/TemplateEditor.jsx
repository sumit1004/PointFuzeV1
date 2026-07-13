import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useHistoryState } from '../../../hooks/useHistoryState';
import { fetchUserTemplates, saveTemplate } from '../../../services/template/templateService';
import TemplateCanvas from '../../../components/template/editor/TemplateCanvas';
import TemplateSidebar from '../../../components/template/editor/TemplateSidebar';
import PropertiesPanel from '../../../components/template/editor/PropertiesPanel';
import TemplateHeader from '../../../components/template/editor/TemplateHeader';
import { CANVAS_PRESETS } from '../../../constants/templateConstants';
import toast from 'react-hot-toast';

const TemplateEditor = () => {
  const { templateId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  
  // Initialize History State
  const [templateState, setTemplateState, { undo, redo, canUndo, canRedo }] = useHistoryState({
    metadata: { id: '', name: 'New Template', category: 'MATCH_RESULT' },
    settings: { ...CANVAS_PRESETS['16:9'], backgroundColor: '#0a0a0a' },
    layers: []
  });

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      if (templateId === 'new') {
        setLoading(false);
        return;
      }
      
      try {
        const templates = await fetchUserTemplates(user.uid);
        const tpl = templates.find(t => t.metadata.id === templateId);
        if (tpl) {
          setTemplateState(tpl);
        } else {
          toast.error('Template not found');
          navigate('/dashboard/template-studio');
        }
      } catch (err) {
        toast.error('Failed to load template');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user, templateId]);

  const handleSave = async () => {
    try {
      const saved = await saveTemplate(user.uid, templateState);
      toast.success('Template Saved!');
      if (templateId === 'new') {
        navigate(`/dashboard/template-studio/${saved.metadata.id}`, { replace: true });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to save template');
    }
  };

  const updateSettings = (updates) => {
    setTemplateState(prev => ({ ...prev, settings: { ...prev.settings, ...updates } }));
  };

  const addLayer = (layerType, config = {}) => {
    const newLayer = {
      id: `layer_${Date.now()}`,
      type: layerType,
      name: `New ${layerType}`,
      style: { x: 50, y: 50, width: 400, height: 100, zIndex: templateState.layers.length + 1 },
      config
    };
    setTemplateState(prev => ({ ...prev, layers: [...prev.layers, newLayer] }));
    setSelectedLayerId(newLayer.id);
  };

  const updateLayer = (id, updates) => {
    setTemplateState(prev => ({
      ...prev,
      layers: prev.layers.map(l => l.id === id ? { ...l, ...updates } : l)
    }));
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-primary">Loading Editor...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#050505', overflow: 'hidden' }}>
      <TemplateHeader 
        template={templateState} 
        onNameChange={(name) => setTemplateState(prev => ({ ...prev, metadata: { ...prev.metadata, name } }))}
        onSave={handleSave} 
        onExit={() => navigate('/dashboard/template-studio')}
        undo={undo} redo={redo} canUndo={canUndo} canRedo={canRedo}
      />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <TemplateSidebar 
          template={templateState} 
          onAddLayer={addLayer} 
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
        />
        
        <div style={{ flex: 1, position: 'relative', overflow: 'auto', backgroundColor: '#111' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <TemplateCanvas 
              template={templateState} 
              selectedLayerId={selectedLayerId}
              onSelectLayer={setSelectedLayerId}
              onUpdateLayer={updateLayer}
            />
          </div>
        </div>

        <PropertiesPanel 
          template={templateState}
          selectedLayerId={selectedLayerId}
          onUpdateLayer={updateLayer}
          onUpdateSettings={updateSettings}
        />
      </div>
    </div>
  );
};

export default TemplateEditor;
