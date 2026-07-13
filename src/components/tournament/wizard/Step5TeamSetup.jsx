import { useState, useEffect } from 'react';
import { parseExcel } from '../../../utils/excel/parseExcel';
import { validateTeams } from '../../../utils/validation/teamValidation';
import { GAME_LIST } from '../../../constants/games';
import ExcelUploader from './teams/ExcelUploader';
import ManualTeamEntry from './teams/ManualTeamEntry';
import ValidationSummaryScreen from './teams/ValidationSummaryScreen';
import TeamListEditor from './teams/TeamListEditor';
import Button from '../../ui/Button';
import toast from 'react-hot-toast';

const Step5TeamSetup = ({ formData, updateFormData, onNext, onPrev }) => {
  const [viewState, setViewState] = useState('UPLOAD'); // UPLOAD, VALIDATING, SUMMARY, EDIT
  const [validationData, setValidationData] = useState(null);
  
  // Local state for teams before sending up to formData
  const [localTeams, setLocalTeams] = useState(formData.teams || []);

  const gameInfo = GAME_LIST.find(g => g.id === formData.game);
  const maxPlayers = gameInfo ? gameInfo.maxPlayersPerTeam : 4;

  const handleExcelUpload = async (file) => {
    setViewState('VALIDATING');
    try {
      const parsedRawTeams = await parseExcel(file, formData.game);
      runValidation(parsedRawTeams);
    } catch (error) {
      toast.error('Failed to parse Excel file. Ensure it matches the template.');
      setViewState('UPLOAD');
    }
  };

  const handleManualEntry = (parsedRawTeams) => {
    runValidation(parsedRawTeams);
  };

  const runValidation = (teamsArray) => {
    const vData = validateTeams(teamsArray, formData.calculationMethod, maxPlayers);
    setValidationData(vData);
    setLocalTeams(vData.sanitizedTeams);
    setViewState('SUMMARY');
  };

  const handleUpdateTeam = (teamId, field, value) => {
    setLocalTeams(prev => prev.map(t => {
      if (t.id === teamId) return { ...t, [field]: value };
      return t;
    }));
  };

  const handleRemoveTeam = (teamId) => {
    setLocalTeams(prev => prev.filter(t => t.id !== teamId));
  };

  const handleCompleteEdit = () => {
    runValidation(localTeams);
  };

  const proceedToReview = () => {
    updateFormData('teams', localTeams);
    onNext();
  };

  // --- Render logic based on viewState ---
  
  if (viewState === 'VALIDATING') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg">Analyzing Teams...</p>
      </div>
    );
  }

  if (viewState === 'SUMMARY' && validationData) {
    return (
      <ValidationSummaryScreen 
        validationData={validationData} 
        onFixIssues={() => setViewState('EDIT')}
        onProceed={proceedToReview}
      />
    );
  }

  if (viewState === 'EDIT') {
    return (
      <TeamListEditor 
        teams={localTeams}
        methodId={formData.calculationMethod}
        onUpdateTeam={handleUpdateTeam}
        onRemoveTeam={handleRemoveTeam}
        onCompleteEdit={handleCompleteEdit}
      />
    );
  }

  // viewState === 'UPLOAD'
  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Team Import</h3>
        <p className="text-body text-sm">Provide the team roster to initialize the tournament.</p>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full">
        {formData.calculationMethod === 'excel_players' ? (
          <ExcelUploader gameId={formData.game} onFileSelected={handleExcelUpload} />
        ) : (
          <ManualTeamEntry onTeamsParsed={handleManualEntry} />
        )}
      </div>

      <div className="flex justify-between mt-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
        <Button variant="ghost" onClick={onPrev}>Back</Button>
        {localTeams.length > 0 && (
          <Button variant="secondary" onClick={() => setViewState('SUMMARY')}>
            View Current Import
          </Button>
        )}
      </div>
    </div>
  );
};

export default Step5TeamSetup;
