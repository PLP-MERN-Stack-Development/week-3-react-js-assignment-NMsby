import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Card from './Card';

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        console.error('Error Boundary caught an error:', error, errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleRetry = () => {
        // Reset error state to retry
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                    <Card
                        title="🚫 Something went wrong"
                        subtitle="We're sorry for the inconvenience"
                        variant="bordered"
                        className="max-w-md text-center"
                    >
                        <div className="space-y-4">
                            <div className="text-6xl mb-4">😵</div>

                            <p className="text-gray-600 dark:text-gray-400">
                                An unexpected error occurred while rendering this component.
                                Please try refreshing the page or contact support if the problem persists.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    variant="primary"
                                    onClick={this.handleRetry}
                                    className="flex items-center gap-2"
                                >
                                    🔄 Try Again
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2"
                                >
                                    ↻ Refresh Page
                                </Button>
                            </div>

                            {/* Show error details in development */}
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mt-6 text-left">
                                    <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        🔍 Error Details (Development Only)
                                    </summary>
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <pre className="text-xs text-red-700 dark:text-red-300 overflow-auto">
                      {this.state.error.toString()}
                        {this.state.errorInfo.componentStack}
                    </pre>
                                    </div>
                                </details>
                            )}
                        </div>
                    </Card>
                </div>
            );
        }

        // No error, render children normally
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;