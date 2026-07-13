import { CheckCircle2 } from 'lucide-react';
import Button from '../../ui/Button';
import { METHOD_LIST } from '../../../constants/methods';
import toast from 'react-hot-toast';

const Step3Method = ({ formData, updateFormData, onNext, onPrev }) => {
  const handleSelect = (methodId) => {
    updateFormData('calculationMethod', methodId);
  };

  const handleNext = () => {
    if (!formData.calculationMethod) {
      toast.error('Please select a calculation method.');
      return;
    }
    onNext();
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Calculation Method</h3>
        <p className="text-body text-sm">How do you want to input scores after each match?</p>
      </div>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full flex-1">
        {METHOD_LIST.map(method => (
          <button
            key={method.id}
            onClick={() => handleSelect(method.id)}
            className={`flex flex-col md:flex-row items-start md:items-center text-left p-6 border-2 rounded-xl transition-all ${
              formData.calculationMethod === method.id 
                ? 'border-primary bg-[rgba(255,122,0,0.1)] shadow-glow' 
                : 'border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.2)]'
            }`}
          >
            <div className="flex-1 mb-4 md:mb-0">
              <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
                {method.title}
                {formData.calculationMethod === method.id && <CheckCircle2 size={18} className="text-primary" />}
              </h4>
              <p className="text-sm text-text-secondary">{method.description}</p>
            </div>
            
            <div className="flex-1 md:border-l md:border-[rgba(255,255,255,0.1)] md:pl-6">
              <ul className="space-y-1">
                {method.advantages.map((adv, idx) => (
                  <li key={idx} className="text-xs text-text-secondary flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div> {adv}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
        <Button variant="ghost" onClick={onPrev}>Back</Button>
        <Button variant="primary" onClick={handleNext}>Next Step</Button>
      </div>
    </div>
  );
};

export default Step3Method;
