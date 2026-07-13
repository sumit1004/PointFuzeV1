import { TOURNAMENT_STATUS } from '../../constants/tournamentStatus';

const TournamentStatusBadge = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  let label = '';

  switch (status) {
    case TOURNAMENT_STATUS.ACTIVE:
      bgColor = 'bg-[rgba(34,197,94,0.15)]';
      textColor = 'text-success';
      label = 'Active';
      break;
    case TOURNAMENT_STATUS.COMPLETED:
      bgColor = 'bg-[rgba(59,130,246,0.15)]';
      textColor = 'text-blue-400';
      label = 'Completed';
      break;
    case TOURNAMENT_STATUS.DRAFT:
    default:
      bgColor = 'bg-[rgba(255,255,255,0.1)]';
      textColor = 'text-text-secondary';
      label = 'Draft';
      break;
  }

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
};

export default TournamentStatusBadge;
