import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import WizardStepper from './WizardStepper';
import Step1BasicInfo from './Step1BasicInfo';
import Step2GameSelection from './Step2GameSelection';
import Step3Method from './Step3Method';
import Step4PointConfig from './Step4PointConfig';
import Step5TeamSetup from './Step5TeamSetup';
import Step6Review from './Step6Review';
import { useAuth } from '../../../hooks/useAuth';
import { initializeTournament } from '../../../services/tournament/tournamentService';

const INITIAL_STATE = {
  name: '',
  description: '',
  game: '',
  calculationMethod: '',
  pointConfig: null,
  teams: []
};

const STEPS = ['Basic Info', 'Game', 'Method', 'Scoring', 'Team Setup', 'Review'];

const TournamentWizard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = async (status = 'ACTIVE') => {
    setIsSubmitting(true);
    try {
      const payload = { ...formData, status };
      const newId = await initializeTournament(user.uid, payload, formData.teams);
      toast.success('Tournament Initialized successfully!');
      navigate(`/dashboard/tournaments/${newId}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to initialize tournament.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-xl border border-[rgba(255,255,255,0.05)] shadow-xl relative min-h-[500px] flex flex-col">
      <WizardStepper currentStep={currentStep} totalSteps={6} stepTitles={STEPS} />
      
      <div className="flex-1 mt-6">
        {currentStep === 1 && (
          <Step1BasicInfo formData={formData} updateFormData={updateFormData} onNext={nextStep} />
        )}
        {currentStep === 2 && (
          <Step2GameSelection formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
        )}
        {currentStep === 3 && (
          <Step3Method formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
        )}
        {currentStep === 4 && (
          <Step4PointConfig formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
        )}
        {currentStep === 5 && (
          <Step5TeamSetup formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
        )}
        {currentStep === 6 && (
          <Step6Review formData={formData} onPrev={prevStep} onCreate={() => handleCreate('ACTIVE')} onSaveDraft={() => handleCreate('DRAFT')} isSubmitting={isSubmitting} />
        )}
      </div>
    </div>
  );
};

export default TournamentWizard;
