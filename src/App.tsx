import  { useEffect, useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { ResultCard } from './components/ResultCard';
import { NameInput } from './components/NameInput';
import { QuizData, Question, UserAnswer } from './types';
import { BookOpen } from 'lucide-react';
import quizData from './data/questions.json';


const InstructionsPage = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold mb-4">📝 Quiz Instructions</h2>

    <div className="text-left text-gray-800 space-y-4">
      <div>
        <h3 className="font-semibold text-lg">Question Format:</h3>
        <ul className="list-disc pl-5">
          <li>Each question contains 4 blanks.</li>
          <li>You will be given 4 options to fill in the blanks.</li>
          <li>Each blank must be filled with one option.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Marking Scheme:</h3>
        <ul className="list-disc pl-5">
          <li>1 mark for every correct blank.</li>
          <li>Each question is worth a total of 4 marks.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Timing:</h3>
        <ul className="list-disc pl-5">
          <li>You will have 30 seconds to answer each question.</li>
          <li>The question will automatically change after 30 seconds.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Navigation:</h3>
        <ul className="list-disc pl-5">
          <li>You cannot proceed to the next question until all blanks are filled.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg">Note:</h3>
        <ul className="list-disc pl-5">
          <li>
            Choose your answers carefully. Once submitted or time runs out, you cannot return to the previous question.
          </li>
        </ul>
      </div>
    </div>

    <button
      onClick={onStart}
      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Start Quiz
    </button>
  </div>
);
function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  useEffect(() => {
    // Load questions from the JSON file
    setQuestions(quizData.data.questions);
  }, []);

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      const blankCount = (questions[currentQuestionIndex].question.match(/_____________/g) || []).length;
      setSelectedAnswers(new Array(blankCount).fill(null));
    }
  }, [currentQuestionIndex, questions]);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setShowInstructions(true);
  };
  const startQuiz = () => {
    setShowInstructions(false);
  };

  const handleAnswerSelect = (index: number, word: string | null) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = word;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswers.every(
      (answer, index) => answer === currentQuestion.correctAnswer[index]
    );

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.questionId,
      answers: [...selectedAnswers],
      isCorrect,
    };

    setUserAnswers((prev) => [...prev, userAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleTimeUp = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.questionId,
      answers: [...selectedAnswers],
      isCorrect: false, 
    };

    setUserAnswers((prev) => [...prev, userAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setUserAnswers([]);
    setIsQuizComplete(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Sentence Construction Quiz
            </h1>
          </div>
        </div>

        <div className="flex justify-center">
          {!userName ? (
            <NameInput onSubmit={handleNameSubmit} />
            ) : showInstructions ? (
              <InstructionsPage onStart={startQuiz} />
            ) : !isQuizComplete ? (
            <QuestionCard
              question={questions[currentQuestionIndex]}
              selectedAnswers={selectedAnswers}
              onAnswerSelect={handleAnswerSelect}
              onTimeUp={handleTimeUp}
              onNext={handleNextQuestion}
              userName={userName}
              currentQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          ) : (
            <ResultCard
              userAnswers={userAnswers}
              questions={questions}
              onRestart={handleRestart}
              userName={userName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;