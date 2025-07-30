import { useState } from 'react'
import { useTheme } from './hooks'
import Layout from './components/Layout'
import Card from './components/Card'
import Button from './components/Button'
import TaskManager from './components/TaskManager'
import ApiDataDisplay from './components/ApiDataDisplay'
import About from './components/About'
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
    const { theme, toggleTheme, isDark } = useTheme()
    const [activeSection, setActiveSection] = useState('demo')

    const handleSectionChange = (section) => {
        setActiveSection(section)
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'tasks':
                return (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                📋 Task Management
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Manage your tasks efficiently with our intuitive task manager.
                                Add, edit, delete, and organize your tasks with persistent storage.
                            </p>
                        </div>
                        <TaskManager />
                    </div>
                )

            case 'api':
                return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                🌐 API Data Integration
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Explore live data from JSONPlaceholder API with advanced features like
                                search, pagination, caching, and error handling.
                            </p>
                        </div>
                        <ApiDataDisplay />
                    </div>
                )

            case 'about':
                return (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <About />
                    </div>
                )

            default: // 'demo'
                return (
                    <div className={`min-h-screen ${
                        isDark
                            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                            : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    } flex items-center justify-center px-4 py-16`}>
                        <div className="max-w-4xl w-full space-y-8">

                            {/* Welcome Hero */}
                            <Card
                                variant="elevated"
                                className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                            >
                                <div className="space-y-6 py-8">
                                    <div className="text-6xl mb-4">📋</div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                        PLP Task Manager
                                    </h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                        A comprehensive React application showcasing modern frontend development
                                        with component architecture, state management, and API integration.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={() => handleSectionChange('tasks')}
                                            className="flex items-center gap-2"
                                        >
                                            📋 Manage Tasks
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            onClick={() => handleSectionChange('api')}
                                            className="flex items-center gap-2"
                                        >
                                            🌐 View API Data
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            onClick={() => handleSectionChange('about')}
                                            className="flex items-center gap-2"
                                        >
                                            📖 Learn More
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Theme Toggle Demo */}
                            <Card
                                title="🎨 Theme System Demo"
                                subtitle={`Current theme: ${theme}`}
                                variant="elevated"
                                className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                            >
                                <div className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Experience our advanced theme system with smooth transitions and persistence!
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

                            {/* Quick Feature Overview */}
                            <Card
                                title="✨ Key Features"
                                variant="elevated"
                                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl mb-3">📋</div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Task Management
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Complete CRUD operations with localStorage persistence
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-3xl mb-3">🌐</div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            API Integration
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            JSONPlaceholder API with search, pagination, and caching
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-3xl mb-3">🎨</div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Modern Design
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Responsive design with dark/light theme system
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Technology Stack */}
                            <Card
                                title="🛠️ Built With"
                                variant="elevated"
                                className="text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <div className="text-blue-500 font-semibold">⚛️ React</div>
                                        <div className="text-gray-500 dark:text-gray-400">v19.1.0</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-cyan-500 font-semibold">🎨 TailwindCSS</div>
                                        <div className="text-gray-500 dark:text-gray-400">v4.1.11</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-yellow-500 font-semibold">⚡ Vite</div>
                                        <div className="text-gray-500 dark:text-gray-400">v7.0.4</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-green-500 font-semibold">🟨 JavaScript</div>
                                        <div className="text-gray-500 dark:text-gray-400">ES2024</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )
        }
    }

    return (
        <ErrorBoundary>
            <Layout
                currentSection={activeSection}
                onSectionChange={handleSectionChange}
                toggleTheme={toggleTheme}
                currentTheme={theme}
            >
                {renderContent()}
            </Layout>
        </ErrorBoundary>
    )
}

export default App