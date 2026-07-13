import { useState } from 'react';

const WizardStepContext = ({ tournament, onNext }) => {
  const matchesArray = Object.values(tournament.matches || {});
  const [contextType, setContextType] = useState('MATCH');
  const [matchId, setMatchId] = useState(matchesArray[0]?.id || '');

  const handleNext = () => {
    onNext({ contextType, matchId });
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold mb-6">Step 1: What do you want to export?</h3>
      
      <div className="flex flex-col gap-4 flex-1">
        <label className={`p-4 border rounded-lg cursor-pointer transition-colors ${contextType === 'MATCH' ? 'border-primary bg-[rgba(255,122,0,0.1)]' : 'border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.02)]'}`}>
          <div className="flex items-center gap-3">
            <input 
              type="radio" 
              name="contextType" 
              checked={contextType === 'MATCH'}
              onChange={() => setContextType('MATCH')}
              className="accent-primary"
            />
            <span className="font-bold">Match Result</span>
          </div>
          <p className="text-sm text-text-secondary mt-1 ml-7">Export the leaderboard for a specific match.</p>
        </label>

        {contextType === 'MATCH' && (
          <div className="ml-7 p-4 bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] rounded-lg">
            <label className="block text-sm text-text-secondary mb-2">Select Match</label>
            <select 
              value={matchId} 
              onChange={(e) => setMatchId(e.target.value)}
              className="w-full bg-[#111] border border-[rgba(255,255,255,0.1)] rounded p-2 text-white"
            >
              {matchesArray.map(m => (
                <option key={m.id} value={m.id}>Match {m.matchNumber} - {m.map}</option>
              ))}
            </select>
          </div>
        )}

        <label className={`p-4 border rounded-lg cursor-pointer transition-colors ${contextType === 'OVERALL' ? 'border-primary bg-[rgba(255,122,0,0.1)]' : 'border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.02)]'}`}>
          <div className="flex items-center gap-3">
            <input 
              type="radio" 
              name="contextType" 
              checked={contextType === 'OVERALL'}
              onChange={() => setContextType('OVERALL')}
              className="accent-primary"
            />
            <span className="font-bold">Overall Standings</span>
          </div>
          <p className="text-sm text-text-secondary mt-1 ml-7">Export the cumulative leaderboard for the entire tournament.</p>
        </label>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
        <button 
          onClick={handleNext} 
          disabled={contextType === 'MATCH' && !matchId}
          className="btn btn-primary"
        >
          Next: Choose Template
        </button>
      </div>
    </div>
  );
};

export default WizardStepContext;
