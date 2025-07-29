import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Custom hook for accessing theme context
 * Provides easy access to theme state and functions
 * @returns {Object} Theme context object
 * @throws {Error} If used outside of ThemeProvider
 */
const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};

export default useTheme;