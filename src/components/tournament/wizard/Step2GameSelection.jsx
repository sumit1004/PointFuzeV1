import { useState } from 'react';
import Button from '../../ui/Button';
import { GAME_LIST } from '../../../constants/games';
import { Gamepad2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Step2GameSelection = ({ formData, updateFormData, onNext, onPrev }) => {
  const handleSelect = (gameId) => {
    updateFormData('game', gameId);
    
    // Auto-select the default calculation method for this game
    const game = GAME_LIST.find(g => g.id === gameId);
    if (game && !formData.calculationMethod) {
      updateFormData('calculationMethod', game.defaultMethod);
    }
  };

  const handleNext = () => {
    if (!formData.game) {
      toast.error('Please select a game to continue.');
      return;
    }
    onNext();
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Select Game</h3>
        <p className="text-body text-sm">Choose the esports title for this tournament.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto w-full flex-1 content-start">
        {GAME_LIST.map(game => (
          <button
            key={game.id}
            onClick={() => handleSelect(game.id)}
            className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl transition-all ${
              formData.game === game.id 
                ? 'border-primary bg-[rgba(255,122,0,0.1)] shadow-glow scale-105' 
                : 'border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.2)]'
            }`}
          >
            <Gamepad2 size={40} className={formData.game === game.id ? 'text-primary mb-3' : 'text-text-secondary mb-3'} />
            <span className="font-semibold">{game.name}</span>
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

export default Step2GameSelection;
