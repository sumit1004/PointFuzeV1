import { AlertTriangle, XCircle, Info } from 'lucide-react';

const ValidationSummaryScreen = ({ validationData, onFixIssues, onProceed }) => {
  const { errors, warnings, suggestions } = validationData;

  const hasErrors = errors && errors.length > 0;
  const hasWarnings = warnings && warnings.length > 0;

  return (
    <div className="animate-fade-in flex flex-col h-full max-w-3xl mx-auto w-full">
      <div className="mb-6 text-center">
        <h3 className="text-h3 mb-2">Import Summary</h3>
        <p className="text-body text-sm">We've scanned your imported teams. Please review the results.</p>
      </div>

      <div className="flex-1 space-y-4">
        {hasErrors && (
          <div className="glass-panel p-5 border border-error rounded-lg bg-[rgba(239,68,68,0.05)]">
            <h4 className="font-bold text-error flex items-center gap-2 mb-3">
              <XCircle size={20} /> Critical Errors ({errors.length})
            </h4>
            <ul className="space-y-2 text-sm">
              {errors.map((err, i) => (
                <li key={i} className="flex gap-2">
                  <span className="opacity-70 mt-0.5">•</span>
                  <span>{err.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasWarnings && (
          <div className="glass-panel p-5 border border-yellow-500 rounded-lg bg-[rgba(234,179,8,0.05)]">
            <h4 className="font-bold text-yellow-500 flex items-center gap-2 mb-3">
              <AlertTriangle size={20} /> Warnings ({warnings.length})
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              {warnings.map((warn, i) => (
                <li key={i} className="flex gap-2">
                  <span className="opacity-70 mt-0.5">•</span>
                  <span>{warn.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="glass-panel p-5 border border-blue-500 rounded-lg bg-[rgba(59,130,246,0.05)]">
            <h4 className="font-bold text-blue-400 flex items-center gap-2 mb-3">
              <Info size={20} /> Suggestions ({suggestions.length})
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              {suggestions.map((sug, i) => (
                <li key={i} className="flex gap-2">
                  <span className="opacity-70 mt-0.5">•</span>
                  <span>{sug.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!hasErrors && !hasWarnings && (
          <div className="text-center py-12 glass-panel rounded-lg border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.05)]">
            <div className="w-16 h-16 bg-[rgba(34,197,94,0.2)] text-success rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-xl font-bold text-success mb-2">Perfect Import!</h4>
            <p className="text-text-secondary">All teams and players are properly formatted.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
        <button className="btn btn-ghost" onClick={onFixIssues}>
          Review & Edit List
        </button>
        <button 
          className={`btn ${hasErrors ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}`} 
          onClick={hasErrors ? null : onProceed}
          disabled={hasErrors}
        >
          {hasErrors ? 'Fix Errors to Continue' : 'Looks Good, Continue'}
        </button>
      </div>
    </div>
  );
};

import { CheckCircle2 } from 'lucide-react';
export default ValidationSummaryScreen;
