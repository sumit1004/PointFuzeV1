import { Check } from 'lucide-react';

const WizardStepper = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8 relative">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.05)] -z-10 transform -translate-y-1/2"></div>
      
      {/* Active Line Fill */}
      <div 
        className="absolute top-1/2 left-0 h-[2px] bg-primary -z-10 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      ></div>

      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={i} className="flex flex-col items-center relative z-10 bg-background px-2">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                ${isActive ? 'bg-primary text-white shadow-glow scale-110' : 
                  isCompleted ? 'bg-primary text-white' : 
                  'bg-[rgba(255,255,255,0.1)] text-text-secondary border border-[rgba(255,255,255,0.05)]'}
              `}
            >
              {isCompleted ? <Check size={18} /> : stepNum}
            </div>
            {/* Hidden on mobile to save space, but visible on md */}
            <span className={`hidden md:block mt-2 text-xs font-semibold ${isActive || isCompleted ? 'text-primary' : 'text-text-secondary'}`}>
              {stepTitles[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WizardStepper;
