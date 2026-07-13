import { useState, useRef, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import WizardStepContext from './WizardStepContext';
import WizardStepTemplate from './WizardStepTemplate';
import ExportProgressOverlay from './ExportProgressOverlay';
import { renderToDataUrl } from '../../services/export/renderingAdapter';
import { downloadBatch } from '../../services/export/downloadManager';
import { logExportAnalytics } from '../../services/export/exportAnalytics';
import { buildExportData } from '../../services/export/exportDataBuilder';
import { compileTemplate } from '../../services/template/templateCompiler';
import TemplateCanvas from '../template/editor/TemplateCanvas';
import { useAuth } from '../../hooks/useAuth';

const ExportWizard = ({ tournament, onClose }) => {
  const { user } = useAuth();
  const captureRef = useRef(null);
  
  const [step, setStep] = useState(1);
  const [exportConfig, setExportConfig] = useState({
    contextType: 'MATCH',
    matchId: null,
    template: null
  });

  const [exportState, setExportState] = useState({
    isActive: false,
    status: 'idle', 
    error: null
  });

  // Compile template for off-screen rendering
  const dataPayload = useMemo(() => {
    if (!exportConfig.template) return null;
    return buildExportData(tournament, exportConfig.contextType, exportConfig.matchId);
  }, [tournament, exportConfig]);

  const compiledTemplate = useMemo(() => {
    if (!exportConfig.template || !dataPayload) return null;
    return compileTemplate(exportConfig.template, dataPayload);
  }, [exportConfig.template, dataPayload]);

  const handleContextNext = (data) => {
    setExportConfig(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleTemplateNext = (data) => {
    setExportConfig(prev => ({ ...prev, ...data }));
    // Immediately trigger export sequence
    triggerExport(data.template);
  };

  const triggerExport = async (templateObj) => {
    setExportState({ isActive: true, status: 'preparing', error: null });

    try {
      // Small artificial delay to allow React to mount the off-screen canvas with the selected template
      await new Promise(r => setTimeout(r, 600));

      if (!captureRef.current) throw new Error("Renderer not ready.");

      setExportState({ isActive: true, status: 'rendering', error: null });
      
      // Native scale, PNG format
      const dataUrl = await renderToDataUrl(captureRef.current, 'png', 1);

      setExportState({ isActive: true, status: 'optimizing', error: null });
      
      const ctxStr = exportConfig.contextType === 'MATCH' ? `Match-${exportConfig.matchId}` : 'Overall-Standings';
      const safeName = (tournament.metadata?.name || 'Tournament').replace(/\s+/g, '-');
      const filename = `PointFuze-${safeName}-${ctxStr}.png`;

      setExportState({ isActive: true, status: 'downloading', error: null });

      await downloadBatch([{ dataUrl, filename }]);
      await logExportAnalytics(user?.uid, tournament.id, templateObj.metadata.id, exportConfig.contextType);

      setExportState({ isActive: true, status: 'complete', error: null });

    } catch (err) {
      console.error(err);
      setExportState({ isActive: true, status: 'error', error: err.message || 'Export failed.' });
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} className="animate-fade-in">
      <div style={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', width: '100%', maxWidth: '800px', height: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#0a0a0a' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Export Graphic</h2>
          <button onClick={onClose} style={{ padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-hidden">
          {step === 1 && (
            <WizardStepContext 
              tournament={tournament} 
              onNext={handleContextNext} 
            />
          )}
          {step === 2 && (
            <WizardStepTemplate 
              contextType={exportConfig.contextType}
              onNext={handleTemplateNext}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </div>

      {exportState.isActive && (
        <ExportProgressOverlay 
          step={exportState.status}
          error={exportState.error}
          onClose={() => {
            if (exportState.status === 'complete') onClose();
            else setExportState({ isActive: false, status: 'idle', error: null });
          }}
        />
      )}

      {/* Off-screen renderer for html-to-image capture */}
      {compiledTemplate && (
        <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
          <div ref={captureRef} style={{ width: `${compiledTemplate.settings.width}px`, height: `${compiledTemplate.settings.height}px` }}>
            <TemplateCanvas 
               template={compiledTemplate}
               selectedLayerId={null}
               onSelectLayer={() => {}}
               onUpdateLayer={() => {}}
             />
          </div>
        </div>
      )}

    </div>
  );
};

export default ExportWizard;
