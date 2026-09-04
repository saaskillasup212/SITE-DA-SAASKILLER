import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("ErrorBoundary caught error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Algo deu errado
            </h1>
            <p className="text-muted-foreground mb-4">
              Ocorreu um erro ao carregar a página. Por favor, tente recarregar.
            </p>
            {this.state.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 mb-6 text-left overflow-auto text-xs text-red-500 font-mono">
                <strong>{this.state.error.name}</strong>: {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => {
                window.location.href = window.location.href; // Força recarregamento total
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
