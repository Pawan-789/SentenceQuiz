import React from 'react';
import { CheckCircle, XCircle, Trophy, UserCircle } from 'lucide-react';
import { Question, UserAnswer } from '../types';

interface ResultCardProps {
  userAnswers: UserAnswer[];
  questions: Question[];
  onRestart: () => void;
  userName: string;
}

export function ResultCard({ userAnswers, questions, onRestart, userName }: ResultCardProps) {
  const score = userAnswers.reduce((total, answer, index) => {
    const question = questions[index];
    const correctCount = answer.answers.reduce((count, ans, i) => {
      return ans === question.correctAnswer[i] ? count + 1 : count;
    }, 0);
    return total + correctCount;
  }, 0);

  const totalPossiblePoints = questions.reduce((total, question) => {
    return total + question.correctAnswer.length;
  }, 0);

  const percentage = (score / totalPossiblePoints) * 100;

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <UserCircle className="w-6 h-6 text-blue-500" />
          <h2 className="text-3xl font-bold text-gray-800">
            Congratulations, {userName}!
          </h2>
        </div>
        <p className="text-xl text-gray-600">
          Your Score: <span className="font-bold text-blue-600">{score}</span> out of{' '}
          <span className="font-bold">{totalPossiblePoints}</span> points
        </p>
        <p className="text-lg text-gray-500 mt-2">
          You got {percentage.toFixed(1)}% of the answers correct!
        </p>
      </div>

      <div className="space-y-6">
        {userAnswers.map((answer, index) => {
          const question = questions[index];
          const correctCount = answer.answers.reduce((count, ans, i) => {
            return ans === question.correctAnswer[i] ? count + 1 : count;
          }, 0);
          const totalBlanks = question.correctAnswer.length;
          
          return (
            <div
              key={answer.questionId}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {correctCount === totalBlanks ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
                    <span className="text-sm text-gray-600">
                      Score: {correctCount}/{totalBlanks}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    {question.question.split('_____________').map((part, i) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < question.correctAnswer.length && (
                          <span
                            className={`font-semibold ${
                              answer.answers[i] === question.correctAnswer[i]
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {answer.answers[i] || '(blank)'}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Correct answers: </span>
                    {question.correctAnswer.map((word, i) => (
                      <span key={i} className="font-semibold text-green-600">
                        {word}
                        {i < question.correctAnswer.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={onRestart}
          className="w-full mt-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}