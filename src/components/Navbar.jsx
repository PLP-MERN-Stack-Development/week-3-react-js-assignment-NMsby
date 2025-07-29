import React from 'react';
import { useState } from 'react';
import Button from './Button';

/**
 * Navbar component with responsive design and theme toggle
 * @param {Object} props - Component props
 * @param {function} props.toggleTheme - Function to toggle theme
 * @param {string} props.currentTheme - Current theme (light/dark)
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ toggleTheme, currentTheme = 'light' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                📋 PLP Task Manager
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">

                            href="#home"
                            className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                            Home
                        </a>

                        href="#tasks"
                        className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                        Tasks
                    </a>

                    href="#api-data"
                    className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                    API Data
                </a>

                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                About
            </a>
        </div>
</div>

    {/* Theme Toggle and Mobile Menu Button */}
    <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <Button
            variant="secondary"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
            aria-label="Toggle theme"
        >
            {currentTheme === 'light' ? '🌙' : '☀️'}
        </Button>

        {/* Mobile menu button */}
        <div className="md:hidden">
            <Button
                variant="secondary"
                size="sm"
                onClick={toggleMenu}
                className="p-2"
                aria-label="Toggle menu"
            >
                <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isMenuOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </Button>
        </div>
    </div>
</div>

    {/* Mobile Navigation Menu */}
    {isMenuOpen && (
        <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">

                href="#home"
                className="text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
                >
                Home
            </a>

            href="#tasks"
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
            >
            Tasks
        </a>

        href="#api-data"
        className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        onClick={toggleMenu}
            >
            API Data
    </a>

        href="#about"
        className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        onClick={toggleMenu}
            >
            About
            </a>
    </div>
    </div>
    )}
</div>
</nav>
);
};

export default Navbar;