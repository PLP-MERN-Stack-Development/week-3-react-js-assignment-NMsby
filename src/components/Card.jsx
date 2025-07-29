import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.variant - Card variant (default, bordered, elevated)
 * @param {string} props.size - Card size (sm, md, lg)
 * @param {boolean} props.hoverable - Whether card has hover effects
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 * @returns {JSX.Element} - Card component
 */
const Card = ({
                  children,
                  title,
                  subtitle,
                  variant = 'default',
                  size = 'md',
                  hoverable = false,
                  className = '',
                  onClick,
                  ...rest
              }) => {
    // Base classes
    const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg transition-all duration-200';

    // Variant classes
    const variantClasses = {
        default: 'shadow',
        bordered: 'border border-gray-200 dark:border-gray-700',
        elevated: 'shadow-lg',
        flat: 'shadow-none',
    };

    // Size classes
    const sizeClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    // Hover classes
    const hoverClasses = hoverable
        ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
        : '';

    // Click handler classes
    const clickableClasses = onClick ? 'cursor-pointer' : '';

    // Combine all classes
    const cardClasses = `
    ${baseClasses} 
    ${variantClasses[variant] || variantClasses.default} 
    ${sizeClasses[size] || sizeClasses.md} 
    ${hoverClasses} 
    ${clickableClasses} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <div
            className={cardClasses}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e);
                }
            } : undefined}
            {...rest}
        >
            {/* Header Section */}
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Content Section */}
            <div className="text-gray-700 dark:text-gray-300">
                {children}
            </div>
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'bordered', 'elevated', 'flat']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    hoverable: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Card;