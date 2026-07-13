import HistoryCard from './HistoryCard';

const HistoryGrid = ({ tournaments, onView, onExport, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
      {tournaments.map(tournament => (
        <HistoryCard 
          key={tournament.id} 
          tournament={tournament} 
          onView={onView}
          onExport={onExport}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HistoryGrid;
