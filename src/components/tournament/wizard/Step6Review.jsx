import Button from '../../ui/Button';
import { GAME_LIST } from '../../../constants/games';
import { METHOD_LIST } from '../../../constants/methods';
import { CheckCircle2 } from 'lucide-react';

const Step6Review = ({ formData, onPrev, onCreate, onSaveDraft, isSubmitting }) => {
  const game = GAME_LIST.find(g => g.id === formData.game) || {};
  const method = METHOD_LIST.find(m => m.id === formData.calculationMethod) || {};

  const teamCount = formData.teams ? formData.teams.length : 0;
  
  let playerCount = 0;
  if (formData.teams && method.id === 'excel_players') {
    formData.teams.forEach(t => {
      if (t.players) playerCount += t.players.length;
    });
  }

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Review & Initialize</h3>
        <p className="text-body text-sm">Verify your settings and imported teams before finalizing.</p>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full flex-1">
        <div className="glass-panel p-6 rounded-lg border border-[rgba(255,255,255,0.05)]">
          <div className="grid grid-cols-2 gap-4 mb-4 border-b border-[rgba(255,255,255,0.05)] pb-4">
            <div>
              <p className="text-xs text-text-secondary uppercase">Tournament Name</p>
              <p className="font-semibold text-lg">{formData.name}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase">Game</p>
              <p className="font-semibold text-lg">{game.name}</p>
            </div>
          </div>
          
          <div className="mb-4 border-b border-[rgba(255,255,255,0.05)] pb-4">
            <p className="text-xs text-text-secondary uppercase mb-1">Calculation Method</p>
            <p className="font-medium text-primary">{method.title}</p>
          </div>

          <div>
            <p className="text-xs text-text-secondary uppercase mb-2">Registration Status</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-[rgba(34,197,94,0.1)] px-3 py-2 rounded text-success">
                <CheckCircle2 size={18} />
                <span className="font-semibold">{teamCount} Teams Imported</span>
              </div>
              {method.id === 'excel_players' && (
                <div className="flex items-center gap-2 bg-[rgba(59,130,246,0.1)] px-3 py-2 rounded text-blue-400">
                  <CheckCircle2 size={18} />
                  <span className="font-semibold">{playerCount} Players Total</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
        <Button variant="ghost" onClick={onPrev} disabled={isSubmitting}>Back</Button>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onSaveDraft} disabled={isSubmitting}>
            Save as Draft
          </Button>
          <Button variant="primary" onClick={onCreate} disabled={isSubmitting}>
            {isSubmitting ? 'Initializing...' : 'Initialize Tournament'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step6Review;
