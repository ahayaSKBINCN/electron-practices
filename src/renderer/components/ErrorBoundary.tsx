import React, { ErrorInfo } from 'react';

interface ErrorBundleProps {
  didCatch?:(error:Error,errorInfo: ErrorInfo)=>void;
}

export default class ErrorBoundary extends React.Component<ErrorBundleProps, {
  error: Error| null;
  hasError: boolean;
}> {
  constructor(props: ErrorBundleProps) {
    super(props);
    this.state = {
      error:null,
      hasError: false
    }
  }

  static getDerivedStateFromError(error:Error){
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
     if(this.props.didCatch){
       this.props.didCatch(error,errorInfo);
     }
  }

  render() {
    const { children } = this.props;
    const {
      error,
      hasError
    } = this.state;

    if(hasError){
      return <ul>
        <li>{error?.name}:{error?.message}</li>
        <li>{error?.stack}</li>

      </ul>;
    }
    return children;
  }

}
