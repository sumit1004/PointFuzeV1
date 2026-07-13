import { useParams } from 'react-router-dom';
import { TournamentProvider } from '../../../contexts/TournamentContext';
import MatchWorkspace from '../../../components/tournament/workspace/MatchWorkspace';

const TournamentDetails = () => {
  const { tournamentId } = useParams();

  return (
    <TournamentProvider tournamentId={tournamentId}>
      <MatchWorkspace />
    </TournamentProvider>
  );
};

export default TournamentDetails;
