import { useState } from 'react'

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    🎉 TailwindCSS v4 is Working!
                </h1>
                <p className="text-gray-600 text-lg">
                    Your setup is complete and ready for development.
                </p>
                <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default App