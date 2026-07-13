const DeleteTournamentModal = ({ isOpen, onClose, onConfirm, tournamentName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-xl shadow-lg border border-[rgba(255,255,255,0.1)] overflow-hidden">
        <div className="p-6">
          <h3 className="text-h3 mb-2 text-error">Delete Tournament?</h3>
          <p className="text-body text-sm mb-6">
            Are you sure you want to delete <strong className="text-text">{tournamentName}</strong>? This action cannot be undone and will permanently erase all settings, matches, and generated results.
          </p>
          
          <div className="flex gap-3 justify-end">
            <button 
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary bg-error border-error hover:bg-red-600"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTournamentModal;
