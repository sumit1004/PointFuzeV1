import { useState, useEffect } from 'react';
import { fetchUserTemplates } from '../../services/template/templateService';
import { useAuth } from '../../hooks/useAuth';
import { LayoutTemplate } from 'lucide-react';
import Skeleton from '../ui/Skeleton';

const WizardStepTemplate = ({ contextType, onNext, onBack }) => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const loadTemplates = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const allTemplates = await fetchUserTemplates(user.uid);
        // Filter compatibility
        const expectedCategory = contextType === 'MATCH' ? 'MATCH_RESULT' : 'OVERALL_RESULT';
        // Allow MVP_CARD later if we add an MVP context
        const compatible = allTemplates.filter(t => t.metadata.category === expectedCategory);
        setTemplates(compatible);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, [user, contextType]);

  const handleNext = () => {
    if (selectedTemplate) onNext({ template: selectedTemplate });
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold mb-6">Step 2: Choose a Compatible Template</h3>
      
      <div className="flex-1 overflow-y-auto pr-2">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-10 text-text-secondary">
            <p>No compatible templates found.</p>
            <p className="text-sm mt-2">Go to the Template Studio to create a {contextType === 'MATCH' ? 'Match Result' : 'Overall Standings'} template.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {templates.map(template => (
              <div 
                key={template.metadata.id} 
                onClick={() => setSelectedTemplate(template)}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedTemplate?.metadata?.id === template.metadata.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]'}`}
              >
                <div className="aspect-video bg-[rgba(0,0,0,0.5)] flex items-center justify-center border-b border-[rgba(255,255,255,0.05)] relative">
                  <LayoutTemplate size={32} className="text-[rgba(255,255,255,0.1)]" />
                  {template.metadata.isBuiltIn && (
                    <span className="absolute top-2 right-2 text-[10px] uppercase font-bold bg-primary px-1.5 rounded text-black">Built-in</span>
                  )}
                </div>
                <div className="p-3 bg-[#0a0a0a]">
                  <h4 className="font-bold text-sm truncate">{template.metadata.name}</h4>
                  <p className="text-xs text-text-secondary mt-1">{template.settings.width}x{template.settings.height}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
        <button onClick={onBack} className="btn btn-ghost">Back</button>
        <button 
          onClick={handleNext} 
          disabled={!selectedTemplate}
          className="btn btn-primary"
        >
          Start Export
        </button>
      </div>
    </div>
  );
};

export default WizardStepTemplate;
