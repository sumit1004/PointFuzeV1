import { useState, useMemo, useRef } from 'react';
import TemplateCanvas from '../template/editor/TemplateCanvas';
import { buildExportData } from '../../services/export/exportDataBuilder';
import { compileTemplate } from '../../services/template/templateCompiler';
import { EXPORT_PRESETS, EXPORT_FORMATS } from '../../constants/exportConstants';

const WizardStepPreview = ({ tournament, contextType, matchId, template, onExport, onBack }) => {
  const [presetKey, setPresetKey] = useState(Object.keys(EXPORT_PRESETS)[0]);
  const [format, setFormat] = useState(EXPORT_FORMATS.PNG);
  
  const captureRef = useRef(null);

  // 1. Build generic data payload from strict tournament schema
  const dataPayload = useMemo(() => {
    return buildExportData(tournament, contextType, matchId);
  }, [tournament, contextType, matchId]);

  // 2. Compile the template with the real data
  const compiledTemplate = useMemo(() => {
    // If the template settings dimensions differ from preset, the compiler could potentially overwrite them,
    // but we will keep the original template aspect ratio for the preview, and just scale during export.
    return compileTemplate(template, dataPayload);
  }, [template, dataPayload]);

  const handleExport = () => {
    onExport({
      nodeRef: captureRef.current,
      preset: EXPORT_PRESETS[presetKey],
      format
    });
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold mb-4">Step 3: Preview & Export Settings</h3>
      
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        
        {/* Rendered Preview - We wrap TemplateCanvas with a ref to capture it */}
        <div className="flex-1 bg-[#0a0a0a] rounded-lg border border-[rgba(255,255,255,0.05)] overflow-hidden relative flex items-center justify-center p-4">
          <div className="w-full h-full relative" ref={captureRef}>
            {/* The canvas handles scaling internally for display, but for export we might need to bypass it.
                For now, the captureRef captures the scaled canvas. Our renderingAdapter will force 1:1 scale during capture. */}
             <TemplateCanvas 
               template={compiledTemplate}
               selectedLayerId={null}
               onSelectLayer={() => {}}
               onUpdateLayer={() => {}}
             />
          </div>
        </div>

        {/* Settings Panel */}
        <div className="w-full md:w-64 flex flex-col gap-4 overflow-y-auto pr-2">
          
          <div>
            <label className="block text-sm text-text-secondary mb-1">Export Preset</label>
            <div className="flex flex-col gap-2">
              {Object.entries(EXPORT_PRESETS).map(([key, preset]) => (
                <label key={key} className={`p-2 border rounded cursor-pointer transition-colors ${presetKey === key ? 'border-primary bg-[rgba(255,122,0,0.1)]' : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]'}`}>
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={presetKey === key} 
                      onChange={() => setPresetKey(key)}
                      className="accent-primary"
                    />
                    <span className="text-sm font-bold">{preset.name}</span>
                  </div>
                  <div className="text-[10px] text-text-secondary mt-1 ml-5">
                    {preset.width}x{preset.height} - {preset.description}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">Format</label>
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-[#111] border border-[rgba(255,255,255,0.1)] rounded p-2 text-sm text-white"
            >
              <option value={EXPORT_FORMATS.PNG}>High Quality PNG</option>
              <option value={EXPORT_FORMATS.JPG}>Compressed JPG</option>
            </select>
          </div>

        </div>
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
        <button onClick={onBack} className="btn btn-ghost">Back</button>
        <button onClick={handleExport} className="btn btn-primary shadow-glow">
          Start Export
        </button>
      </div>
    </div>
  );
};

export default WizardStepPreview;
