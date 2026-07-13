import { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { getDefaultForGame } from '../../../services/tournament/pointConfigurationService';
import { validatePointConfig } from '../../../utils/validation/tournament';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Step4PointConfig = ({ formData, updateFormData, onNext, onPrev }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Initialize config if not present
    if (formData.pointConfig) {
      setConfig(formData.pointConfig);
    } else {
      const defaults = getDefaultForGame(formData.game);
      if (defaults) {
        setConfig(defaults);
      } else {
        // Fallback for games without defaults yet
        setConfig({ killPoint: 1, placements: { 1: 10 } });
      }
    }
  }, [formData.game, formData.pointConfig]);

  const handleNext = () => {
    const { isValid, errors } = validatePointConfig(config);
    if (!isValid) {
      toast.error(Object.values(errors)[0]);
      return;
    }
    updateFormData('pointConfig', config);
    onNext();
  };

  const handlePlacementChange = (position, value) => {
    const val = parseInt(value, 10);
    setConfig(prev => ({
      ...prev,
      placements: {
        ...prev.placements,
        [position]: isNaN(val) ? 0 : val
      }
    }));
  };

  const removePlacement = (position) => {
    const newPlacements = { ...config.placements };
    delete newPlacements[position];
    setConfig(prev => ({ ...prev, placements: newPlacements }));
  };

  const addPlacement = () => {
    const positions = Object.keys(config.placements).map(Number);
    const maxPos = positions.length > 0 ? Math.max(...positions) : 0;
    setConfig(prev => ({
      ...prev,
      placements: {
        ...prev.placements,
        [maxPos + 1]: 0
      }
    }));
  };

  if (!config) return null;

  const placementsArray = Object.entries(config.placements).sort((a, b) => Number(a[0]) - Number(b[0]));

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Point Configuration</h3>
        <p className="text-body text-sm">Review or customize the scoring system for this tournament.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto w-full flex-1">
        {/* Left Column: Settings */}
        <div className="flex-1 glass-panel p-6 rounded-lg h-fit border border-[rgba(255,255,255,0.05)]">
          <h4 className="font-semibold mb-4">Global Settings</h4>
          <div className="mb-6">
            <label className="block text-sm text-text-secondary mb-2">Points Per Kill</label>
            <input 
              type="number"
              min="0"
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded p-2 text-text"
              value={config.killPoint}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setConfig(prev => ({ ...prev, killPoint: isNaN(val) ? 0 : val }));
              }}
            />
          </div>
          
          <Button variant="ghost" size="sm" onClick={() => setConfig(getDefaultForGame(formData.game))}>
            Reset to Defaults
          </Button>
        </div>

        {/* Right Column: Placement Table */}
        <div className="flex-[2] glass-panel p-6 rounded-lg border border-[rgba(255,255,255,0.05)]">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Placement Points</h4>
            <button onClick={addPlacement} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Plus size={14}/> Add Position
            </button>
          </div>
          
          <div className="grid grid-cols-[80px_1fr_40px] gap-2 mb-2 px-2 text-xs text-text-secondary uppercase">
            <span>Position</span>
            <span>Points</span>
            <span></span>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
            {placementsArray.map(([pos, pts]) => (
              <div key={pos} className="grid grid-cols-[80px_1fr_40px] gap-2 items-center bg-[rgba(255,255,255,0.02)] p-2 rounded">
                <span className="font-bold text-center">#{pos}</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 text-text text-sm"
                  value={pts}
                  onChange={(e) => handlePlacementChange(pos, e.target.value)}
                />
                <button onClick={() => removePlacement(pos)} className="text-text-secondary hover:text-error p-1 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
        <Button variant="ghost" onClick={onPrev}>Back</Button>
        <Button variant="primary" onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
};

export default Step4PointConfig;
