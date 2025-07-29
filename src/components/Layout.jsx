import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout component that wraps all pages with consistent navigation and footer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.currentSection - Currently active section
 * @param {function} props.onSectionChange - Function to handle section changes
 * @param {function} props.toggleTheme - Function to toggle theme
 * @param {string} props.currentTheme - Current theme
 * @returns {JSX.Element} - Layout component
 */
const Layout = ({
                    children,
                    currentSection,
                    onSectionChange,
                    toggleTheme,
                    currentTheme
                }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <Navbar
                currentSection={currentSection}
                onSectionChange={onSectionChange}
                toggleTheme={toggleTheme}
                currentTheme={currentTheme}
            />

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    currentSection: PropTypes.string.isRequired,
    onSectionChange: PropTypes.func.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    currentTheme: PropTypes.string.isRequired,
};

export default Layout;