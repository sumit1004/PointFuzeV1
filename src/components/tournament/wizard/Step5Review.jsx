import Button from '../../ui/Button';
import { GAME_LIST } from '../../../constants/games';
import { METHOD_LIST } from '../../../constants/methods';

const Step5Review = ({ formData, onPrev, onCreate, onSaveDraft, isSubmitting }) => {
  const game = GAME_LIST.find(g => g.id === formData.game) || {};
  const method = METHOD_LIST.find(m => m.id === formData.calculationMethod) || {};

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Review & Create</h3>
        <p className="text-body text-sm">Verify your tournament settings before finalizing.</p>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full flex-1">
        <div className="glass-panel p-6 rounded-lg border border-[rgba(255,255,255,0.05)]">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-text-secondary uppercase">Tournament Name</p>
              <p className="font-semibold text-lg">{formData.name}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase">Game</p>
              <p className="font-semibold text-lg">{game.name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-text-secondary uppercase">Calculation Method</p>
              <p className="font-medium text-primary">{method.title}</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-lg border border-[rgba(255,255,255,0.05)]">
          <p className="text-xs text-text-secondary uppercase mb-2">Point Configuration Summary</p>
          <div className="flex items-center justify-between bg-[rgba(0,0,0,0.3)] p-3 rounded">
            <span className="text-sm">Kill Point</span>
            <span className="font-bold text-primary">{formData.pointConfig?.killPoint} pts</span>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            * Plus {Object.keys(formData.pointConfig?.placements || {}).length} placement tiers configured.
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
            {isSubmitting ? 'Creating...' : 'Create Tournament'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step5Review;
