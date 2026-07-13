import { CheckCircle2, Loader2, Download } from 'lucide-react';

const ExportProgressOverlay = ({ step, progress, error, onClose }) => {
  const steps = [
    { id: 'preparing', label: 'Preparing Data' },
    { id: 'rendering', label: 'Rendering DOM' },
    { id: 'optimizing', label: 'Optimizing Image' },
    { id: 'downloading', label: 'Downloading' },
    { id: 'complete', label: 'Complete' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }} className="animate-fade-in">
      <div style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: 'white' }}>Exporting Graphic</h2>

        {error ? (
          <div className="text-center">
            <div className="text-error mb-4">Export Failed: {error}</div>
            <button onClick={onClose} className="btn btn-ghost w-full">Close</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {steps.map((s, index) => {
              const isActive = index === currentStepIndex;
              const isPast = index < currentStepIndex || step === 'complete';
              
              return (
                <div key={s.id} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isPast ? 'bg-primary text-black' : 
                    isActive ? 'bg-[rgba(255,122,0,0.1)] border border-primary text-primary' : 
                    'bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]'
                  }`}>
                    {isPast ? <CheckCircle2 size={16} /> : isActive ? <Loader2 size={16} className="animate-spin" /> : <span>{index + 1}</span>}
                  </div>
                  <span className={`font-bold ${isActive ? 'text-white' : isPast ? 'text-text-secondary' : 'text-[rgba(255,255,255,0.3)]'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}

            {step === 'complete' && (
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)] text-center animate-fade-in">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-black mb-4">
                  <Download size={32} />
                </div>
                <h3 className="text-lg font-bold">Download Complete!</h3>
                <p className="text-sm text-text-secondary mt-1 mb-6">Your professional graphic is ready to share.</p>
                <button onClick={onClose} className="btn btn-primary w-full">Back to Workspace</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportProgressOverlay;
