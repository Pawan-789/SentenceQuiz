import React from 'react';
import { Timer } from './Timer';
import { Question } from '../types';
import { UserCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswers: (string | null)[];
  onAnswerSelect: (index: number, word: string | null) => void;
  onTimeUp: () => void;
  onNext: () => void;
  userName: string;
  currentQuestionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  selectedAnswers,
  onAnswerSelect,
  onTimeUp,
  onNext,
  userName,
  currentQuestionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const words = question.question.split('_____________');
  const isAllAnswered = selectedAnswers.every((answer) => answer !== null);

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-blue-500" />
          <span className="text-lg font-semibold text-gray-700">{userName}</span>
        </div>
        <Timer seconds={30} onTimeUp={onTimeUp} />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Complete the Sentence</h2>
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionNumber} of {totalQuestions}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-lg leading-relaxed">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              {word}
              {index < words.length - 1 && (
                <button
                  onClick={() => onAnswerSelect(index, null)}
                  className={`mx-2 px-4 py-1 rounded ${
                    selectedAnswers[index]
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {selectedAnswers[index] || '______'}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {question.options.map((option) => {
            const isUsed = selectedAnswers.includes(option);
            return (
              <button
                key={option}
                onClick={() => {
                  const firstEmptyIndex = selectedAnswers.findIndex(
                    (answer) => answer === null
                  );
                  if (!isUsed && firstEmptyIndex !== -1) {
                    onAnswerSelect(firstEmptyIndex, option);
                  }
                }}
                disabled={isUsed}
                className={`px-4 py-2 rounded-lg ${
                  isUsed
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={!isAllAnswered}
          className={`w-full mt-6 py-3 rounded-lg font-semibold ${
            isAllAnswered
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}