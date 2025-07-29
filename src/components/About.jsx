import React from 'react';
import Card from './Card';
import Button from './Button';

/**
 * About component showcasing project information and technologies
 * @returns {JSX.Element} - About component
 */
const About = () => {
    const technologies = [
        {
            name: 'React',
            version: '19.1.0',
            description: 'Modern JavaScript library for building user interfaces',
            icon: '⚛️',
            color: 'text-blue-500',
        },
        {
            name: 'TailwindCSS',
            version: '4.1.11',
            description: 'Utility-first CSS framework for rapid UI development',
            icon: '🎨',
            color: 'text-cyan-500',
        },
        {
            name: 'Vite',
            version: '7.0.4',
            description: 'Next generation frontend tooling for fast development',
            icon: '⚡',
            color: 'text-yellow-500',
        },
        {
            name: 'JavaScript',
            version: 'ES2024',
            description: 'Modern JavaScript with latest language features',
            icon: '🟨',
            color: 'text-yellow-600',
        },
    ];

    const features = [
        {
            title: 'Task Management',
            description: 'Complete CRUD operations with localStorage persistence',
            icon: '📋',
        },
        {
            title: 'Theme System',
            description: 'Dark/light mode with system preference detection',
            icon: '🌙',
        },
        {
            title: 'API Integration',
            description: 'RESTful API integration with caching and error handling',
            icon: '🌐',
        },
        {
            title: 'Responsive Design',
            description: 'Mobile-first design that works on all devices',
            icon: '📱',
        },
        {
            title: 'Custom Hooks',
            description: 'Reusable React hooks for state and API management',
            icon: '🪝',
        },
        {
            title: 'Component Library',
            description: 'Reusable UI components with multiple variants',
            icon: '🧩',
        },
    ];

    const stats = [
        { label: 'Components', value: '8+', icon: '🧩' },
        { label: 'Custom Hooks', value: '5+', icon: '🪝' },
        { label: 'API Endpoints', value: '15+', icon: '🌐' },
        { label: 'Lines of Code', value: '2000+', icon: '💻' },
    ];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <Card
                title="📋 PLP Task Manager"
                subtitle="Week 3 MERN Stack Assignment - React.js, JSX, and Tailwind CSS"
                variant="elevated"
                className="text-center"
            >
                <div className="space-y-6">
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        A comprehensive React application demonstrating modern frontend development practices
                        with component architecture, state management, API integration, and responsive design.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="primary" size="lg">
                            🚀 View Demo
                        </Button>
                        <Button variant="secondary" size="lg">
                            📚 Documentation
                        </Button>
                        <Button variant="secondary" size="lg">
                            💻 Source Code
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Project Stats */}
            <Card title="📊 Project Statistics" variant="bordered">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Technologies Used */}
            <Card title="🛠️ Technologies & Tools" subtitle="Modern tech stack for optimal performance">
                <div className="grid gap-6 md:grid-cols-2">
                    {technologies.map((tech, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                            <div className="text-3xl">{tech.icon}</div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h3 className={`font-semibold text-lg ${tech.color}`}>
                                        {tech.name}
                                    </h3>
                                    <span className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                    v{tech.version}
                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {tech.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Key Features */}
            <Card title="✨ Key Features" subtitle="Comprehensive functionality showcase">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} variant="flat" size="sm" hoverable>
                            <div className="text-center">
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            {/* Assignment Requirements */}
            <Card title="📝 Assignment Requirements" subtitle="All requirements successfully implemented">
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                ✅ Core Requirements
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>React application with Vite</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Tailwind CSS configuration</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Reusable UI components</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>State management with hooks</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>API integration</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                🚀 Enhanced Features
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <span className="text-blue-500">+</span>
                                    <span>Dark/Light theme system</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-blue-500">+</span>
                                    <span>Advanced custom hooks</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-blue-500">+</span>
                                    <span>Data caching & persistence</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-blue-500">+</span>
                                    <span>Search & pagination</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="text-blue-500">+</span>
                                    <span>Error handling & loading states</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Developer Info */}
            <Card title="👨‍💻 About the Developer" variant="bordered">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                        👨‍💻
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            PLP Academy Student
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            MERN Stack Development Program • Week 3 Assignment
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
                            This project demonstrates proficiency in modern React development,
                            component architecture, state management, API integration, and responsive design
                            using industry-standard tools and best practices.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default About;