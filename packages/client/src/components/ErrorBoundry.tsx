import { Typography } from '@mui/material';
import { PropsWithChildren, Component, ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundryProps extends PropsWithChildren {
  fallback?: ReactNode;
}

interface ErrorBoundryState extends ErrorBoundryProps {
  hasError: boolean;
}

class ErrorBoundry extends Component<ErrorBoundryProps, ErrorBoundryState> {
  constructor(props: ErrorBoundryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.log(import.meta.env.DEV);
    if (import.meta.env.DEV) {
      console.error(error);
      console.error(errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || <Typography>Something went wrong</Typography>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
