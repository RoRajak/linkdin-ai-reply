import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to AI Helper</h1>
        <p className="text-gray-600 mt-4">
          Enhance your messaging experience with AI-powered suggestions.
        </p>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Start Using AI
        </button>
      </div>
    </div>
  );
};

export default App;
