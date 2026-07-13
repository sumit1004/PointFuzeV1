import { Search, Filter, SortDesc } from 'lucide-react';

const HistoryHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  filterGame, 
  setFilterGame, 
  sortBy, 
  setSortBy, 
  uniqueGames 
}) => {
  return (
    <div className="p-4 border-b border-[rgba(255,255,255,0.05)] bg-[#0a0a0a] flex flex-col md:flex-row gap-4 justify-between items-center z-10 sticky top-0">
      
      {/* Search */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tournaments or champions..." 
          className="w-full bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Filters & Sort */}
      <div className="flex w-full md:w-auto items-center gap-3">
        
        <div className="flex items-center gap-2 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm">
          <Filter size={14} className="text-text-secondary" />
          <select 
            value={filterGame} 
            onChange={(e) => setFilterGame(e.target.value)}
            className="bg-transparent text-white focus:outline-none appearance-none"
          >
            <option value="ALL">All Games</option>
            {uniqueGames.map(game => (
              <option key={game} value={game}>{game}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm">
          <SortDesc size={14} className="text-text-secondary" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white focus:outline-none appearance-none"
          >
            <option value="NEWEST">Newest First</option>
            <option value="OLDEST">Oldest First</option>
            <option value="NAME">Name (A-Z)</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default HistoryHeader;
