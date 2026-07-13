import { useState } from 'react';
import { parseManualTeams } from '../../../../utils/validation/teamValidation';
import Button from '../../../ui/Button';

const ManualTeamEntry = ({ onTeamsParsed }) => {
  const [text, setText] = useState('');

  const handleProcess = () => {
    const rawTeams = parseManualTeams(text);
    onTeamsParsed(rawTeams);
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[rgba(255,255,255,0.05)] mb-4">
        <h4 className="font-semibold mb-1 text-primary">Instructions</h4>
        <p className="text-sm text-text-secondary">Type or paste your team names below. Use <strong>one team name per line</strong>. Empty lines and duplicate names will be automatically removed.</p>
      </div>

      <textarea
        className="w-full flex-1 min-h-[300px] bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 text-text font-mono text-sm resize-none focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
        placeholder="Team Alpha&#10;Team Bravo&#10;Team Charlie&#10;..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={handleProcess} disabled={!text.trim()}>
          Process List
        </Button>
      </div>
    </div>
  );
};

export default ManualTeamEntry;
