import { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const Step1BasicInfo = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Tournament Name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext();
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Basic Information</h3>
        <p className="text-body text-sm">Let's start with a name and an optional description for your tournament.</p>
      </div>

      <div className="flex flex-col gap-6 max-w-lg mx-auto w-full flex-1">
        <Input 
          label="Tournament Name" 
          placeholder="e.g. Summer Clash 2026"
          value={formData.name}
          onChange={(e) => {
            updateFormData('name', e.target.value);
            if (errors.name) setErrors(prev => ({...prev, name: null}));
          }}
          error={errors.name}
        />
        
        <div className="input-container">
          <label className="input-label">Description (Optional)</label>
          <textarea 
            className="input-field min-h-[120px] resize-none"
            placeholder="Describe the rules, prize pool, or schedule..."
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
        <Button variant="primary" size="lg" onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
