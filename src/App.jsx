import { useState } from 'react'
import { useTheme } from "./hooks";
import Button from './components/Button';
import Card from "./components/Card";

function App() {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <div className={`min-h-screen transition-colors duration-200 ${
            isDark
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
        } flex items-center justify-center p-4`}>

            <div className="max-w-4xl w-full space-y-8">

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
                            <div className="text-green-500 font-semibold">✅ Components</div>
                            <div className="text-gray-500 dark:text-gray-400">Ready</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default App