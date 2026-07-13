import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-base text-text-base flex items-center justify-center p-6">
          <div className="glass-panel p-8 rounded-2xl max-w-lg w-full text-center border border-[rgba(255,0,0,0.1)]">
            <div className="w-16 h-16 rounded-full bg-[rgba(255,0,0,0.1)] flex items-center justify-center text-error mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Something went wrong</h1>
            <p className="text-text-secondary mb-6 text-sm">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            <div className="bg-[#050505] p-4 rounded-lg border border-[rgba(255,255,255,0.05)] text-left mb-6 overflow-auto max-h-32 text-xs font-mono text-error">
              {this.state.error?.message || "Unknown error"}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
