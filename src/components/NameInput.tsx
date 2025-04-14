import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center gap-4">
        <UserCircle className="w-16 h-16 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Welcome to the Quiz!</h2>
        <p className="text-gray-600 text-center">
          Please enter your name to begin the sentence construction challenge.
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}