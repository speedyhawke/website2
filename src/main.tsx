import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Fill The Gap Runtime Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl font-black">
              !
            </div>
            <h1 className="text-2xl font-black text-white">Fill The Gap</h1>
            <p className="text-sm text-slate-300">
              A temporary load error was encountered. Click below to reload cleanly.
            </p>
            {this.state.error && (
              <pre className="text-left text-xs bg-slate-950 p-3 rounded-lg text-amber-300/80 overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch {}
                window.location.href = '/';
              }}
              className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              Reset & Reload Home Screen
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Global window error listener to guarantee no silent white-screens
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('[Global Error Caught]:', event.error || event.message);
  });
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('[Unhandled Rejection Caught]:', event.reason);
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );
  } catch (err) {
    console.error('[Mount Error]:', err);
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0b0f19; color: white; font-family: sans-serif; padding: 20px; text-align: center;">
        <div style="max-width: 420px; padding: 30px; background: #1e293b; border-radius: 20px; border: 1px solid #f59e0b;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 12px;">Fill The Gap</h2>
          <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 20px;">Click below to reload the application cleanly.</p>
          <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.href='/';" style="padding: 12px 24px; background: #f59e0b; color: #0f172a; font-weight: bold; border-radius: 12px; border: none; cursor: pointer; width: 100%;">Reload Cleanly</button>
        </div>
      </div>
    `;
  }
}
