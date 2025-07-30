import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading spinner component with customizable size and message
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner (sm, md, lg)
 * @param {string} props.message - Loading message to display
 * @param {boolean} props.fullScreen - Whether to show full screen loading
 * @returns {JSX.Element} - Loading spinner component
 */
const LoadingSpinner = ({
                            size = 'md',
                            message = 'Loading...',
                            fullScreen = false
                        }) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const SpinnerContent = () => (
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Spinner */}
            <div className="relative">
                <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700`}></div>
                <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-blue-500 border-t-transparent absolute top-0 left-0`}></div>
            </div>

            {/* Loading Message */}
            {message && (
                <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium animate-pulse`}>
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
                <SpinnerContent />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-8">
            <SpinnerContent />
        </div>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    message: PropTypes.string,
    fullScreen: PropTypes.bool,
};

export default LoadingSpinner;