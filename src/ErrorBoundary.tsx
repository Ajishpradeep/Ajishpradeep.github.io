import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="relative flex min-h-screen items-center overflow-hidden bg-void pt-24">
          <div className="shell relative">
            <p className="tag text-signal">
              <span className="bracket">interface fault</span>
            </p>
            <h1 className="mt-7 max-w-[18ch] font-display text-headline font-extrabold uppercase leading-[1.02] text-cyan">
              This page stopped
              <br />
              <span className="text-amber">rendering</span>
            </h1>
            <p className="mt-7 max-w-[52ch] copy">
              Something in the interface failed rather than something you did. Reloading usually
              clears it. If it does not, the rest of the site is still reachable from the home page.
            </p>
            {this.state.error?.message ? (
              <p className="mt-5 max-w-[52ch] font-mono text-[0.75rem] leading-relaxed text-dim">
                {this.state.error.message}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap gap-3">
              <button type="button" onClick={() => window.location.reload()} className="btn-amber">
                Reload the page
              </button>
              <a href="/" className="btn-ghost">
                Go to the home page
              </a>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 