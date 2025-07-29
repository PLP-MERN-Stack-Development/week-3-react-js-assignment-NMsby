import { useState } from 'react'
import { useTheme } from "./hooks";
import Button from './components/Button';
import Card from "./components/Card";
import TaskManager from "./components/TaskManager";
import ApiDataDisplay from "./components/ApiDataDisplay";

function App() {
    const { theme, toggleTheme, isDark } = useTheme();
    const [ activeSection, setActiveSection ] = useState('demo');

    const sections = [
        { id: 'demo', label: '🎨 Demo', icon: '🎨' },
        { id: 'tasks', label: '📋 Tasks', icon: '📋' },
        { id: 'api', label: '🌐 API Data', icon: '🌐' },
    ];

    const renderSection = () => {
        switch (activeSection) {
            case 'tasks':
                return <TaskManager />;
            case 'api':
                return <ApiDataDisplay />;
            default:
                return (
                    <div className="space-y-8">
                        {/* Theme Toggle Card */}
                        <Card
                            title="🎨 Theme System Demo"
                            subtitle={`Current theme: ${theme}`}
                            variant="elevated"
                            className="text-center"
                        >
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Click the button below to toggle between light and dark themes!
                                </p>

                                <div className="flex justify-center gap-4">
                                    <Button
                                        variant="primary"
                                        onClick={toggleTheme}
                                        className="flex items-center gap-2"
                                    >
                                        {isDark ? '☀️' : '🌙'}
                                        Switch to {isDark ? 'Light' : 'Dark'} Mode
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Components Demo Card */}
                        <Card
                            title="🧩 Components Demo"
                            subtitle="Testing our reusable components"
                            variant="bordered"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Button Variants */}
                                <div>
                                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                        Button Variants
                                    </h4>
                                    <div className="space-y-2">
                                        <Button variant="primary" size="sm">Primary Small</Button>
                                        <Button variant="secondary" size="md">Secondary Medium</Button>
                                        <Button variant="danger" size="lg">Danger Large</Button>
                                    </div>
                                </div>

                                {/* Card Variants */}
                                <div>
                                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                        Card Variants
                                    </h4>
                                    <div className="space-y-2">
                                        <Card variant="flat" size="sm">
                                            <p className="text-sm">Flat card variant</p>
                                        </Card>
                                        <Card variant="elevated" size="sm" hoverable>
                                            <p className="text-sm">Hoverable elevated card</p>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Status Card */}
                        <Card
                            title="✅ Setup Complete!"
                            subtitle="All systems are working perfectly"
                            variant="default"
                            className="text-center"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="space-y-1">
                                    <div className="text-green-500 font-semibold">✅ React</div>
                                    <div className="text-gray-500 dark:text-gray-400">v19.1.0</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-green-500 font-semibold">✅ TailwindCSS</div>
                                    <div className="text-gray-500 dark:text-gray-400">v4.1.11</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-green-500 font-semibold">✅ Theme System</div>
                                    <div className="text-gray-500 dark:text-gray-400">Working</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-green-500 font-semibold">✅ API Integration</div>
                                    <div className="text-gray-500 dark:text-gray-400">Ready</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 ${
            isDark
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
        }`}>

            {/* Navigation Header */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-white">
                                📋 PLP Task Manager
                            </h1>
                        </div>

                        {/* Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        activeSection === section.id
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>

                        {/* Theme Toggle */}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={toggleTheme}
                            className="p-2 bg-white/20 hover:bg-white/30 border-white/30"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden pb-4">
                        <div className="flex space-x-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                                        activeSection === section.id
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {section.icon} {section.label.split(' ')[1]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderSection()}
            </div>
        </div>
    )
}

export default App