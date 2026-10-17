import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4 text-center">
          <h1 className="font-display text-3xl text-midnight">Something went wrong</h1>
          <p className="mt-4 max-w-md text-slate">
            Please refresh the page or return to the homepage. If the issue persists, contact us
            directly.
          </p>
          <Button className="mt-8" onClick={() => window.location.assign('/')}>
            Go home
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
