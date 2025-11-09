
import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center p-4">
        <div className="inline-block p-4 bg-gray-700/50 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-200 mb-4">How can I help you today?</h2>
        <p className="text-gray-400">Attach an image or a file and ask me anything!</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
