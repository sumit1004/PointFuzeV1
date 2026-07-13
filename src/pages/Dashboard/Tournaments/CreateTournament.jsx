import TournamentWizard from '../../../components/tournament/wizard/TournamentWizard';

const CreateTournament = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-h2 text-gradient">Create Tournament</h2>
        <p className="text-body mt-2">Follow the steps below to configure your tournament's structure and scoring system.</p>
      </div>
      
      <TournamentWizard />
    </div>
  );
};

export default CreateTournament;
