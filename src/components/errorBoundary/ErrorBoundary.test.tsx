import { describe, expect, it, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('Tests for the ErrorBoundary', () => {
  interface MyComponentProps {
    error: Error | null;
  }

  const ChildComponentWithError: React.FC<MyComponentProps> = ({ error }) => {
    if (error) {
      throw error;
    }

    return (
      <div>
        <p>Child Component</p>
      </div>
    );
  };

  it('should render children when there are no errors', () => {
    render(
      <ErrorBoundary>
        <ChildComponentWithError error={null} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should display an error message when there is an error', () => {
    console.error = vitest.fn();
    const error = new Error('Test Error');
    render(
      <ErrorBoundary>
        <ChildComponentWithError error={error} />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Sorry, there was an error, please refresh the page')
    ).toBeInTheDocument();
  });

  it('should set hasError to true in getDerivedStateFromError', () => {
    const result = ErrorBoundary.getDerivedStateFromError();

    expect(result).toEqual({ hasError: true });
  });
});
