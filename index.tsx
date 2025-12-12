
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AgeSelectionScreen from './components/AgeSelectionScreen';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';
import { AgeRange, MathQuestion, OperationType } from './types';
import { generateQuestion } from './services/mathGenerator';
import { generateMathStoryProblem } from './services/geminiService';

const App: React.FC = () => {
  // Application State
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'game'>('welcome');
  const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRange | null>(null);
  
  // Game State
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  
  // AI Story State
  const [story, setStory] = useState<string | null>(null);
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false);

  // Initialize a new question
  const createNewQuestion = (range: AgeRange) => {
    // Pick a random operation allowed for this age group
    const randomOpIndex = Math.floor(Math.random() * range.operations.length);
    const operation = range.operations[randomOpIndex];
    
    const newQuestion = generateQuestion(range.key, operation);
    setQuestion(newQuestion);
    setUserAnswer('');
    setFeedback(null);
    setStory(null);
  };

  const handleAgeSelect = (range: AgeRange) => {
    setSelectedAgeRange(range);
    createNewQuestion(range);
    setCurrentScreen('game');
    setScore(0);
  };

  const handleBackToMenu = () => {
    setCurrentScreen('welcome');
    setSelectedAgeRange(null);
    setQuestion(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    const numAnswer = parseFloat(userAnswer);
    
    // Check if the answer is correct (allowing for small floating point differences just in case, though mostly integer math)
    const isCorrect = Math.abs(numAnswer - question.answer) < 0.01;

    if (isCorrect) {
      setFeedback({ type: 'success', message: 'Correct! Great job! 🎉' });
      setScore(s => s + 10);
      // Wait a moment then load next question
      setTimeout(() => {
        if (selectedAgeRange) createNewQuestion(selectedAgeRange);
      }, 1500);
    } else {
      setFeedback({ type: 'error', message: 'Not quite. Try again!' });
    }
  };

  const handleGetStory = async () => {
    if (!question || !selectedAgeRange) return;
    
    setIsLoadingStory(true);
    const storyText = await generateMathStoryProblem(selectedAgeRange.label, question.operation);
    setStory(storyText);
    setIsLoadingStory(false);
  };

  // Render Welcome Screen
  if (currentScreen === 'welcome') {
    return <AgeSelectionScreen onSelectAge={handleAgeSelect} />;
  }

  // Render Game Screen
  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <button 
          onClick={handleBackToMenu}
          className="text-gray-500 hover:text-blue-600 font-medium text-sm flex items-center"
        >
          ← Back
        </button>
        <div className="text-right">
          <span className="block text-xs text-gray-400 font-uppercase tracking-wider">Score</span>
          <span className="text-xl font-bold text-blue-600">{score}</span>
        </div>
      </div>

      {question && (
        <div className="flex-1 flex flex-col items-center max-w-sm mx-auto w-full space-y-6">
          
          {/* Question Display */}
          <div className="bg-blue-50 rounded-2xl p-8 w-full text-center shadow-inner border border-blue-100">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 block">
              {question.operation}
            </span>
            <div className="text-5xl font-black text-gray-800 tracking-tight">
              {question.question}
            </div>
          </div>

          {/* Feedback */}
          <div className={`h-8 text-center font-bold transition-all duration-300 ${
            feedback?.type === 'success' ? 'text-green-500 scale-110' : 
            feedback?.type === 'error' ? 'text-red-500' : 'opacity-0'
          }`}>
            {feedback?.message}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="?"
              className="w-full text-center text-3xl p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder-gray-300"
              autoFocus
              step="any"
            />
            <Button type="submit" className="w-full py-4 text-lg shadow-lg bg-indigo-600 hover:bg-indigo-700">
              Check Answer
            </Button>
          </form>

          {/* AI Helper Section */}
          <div className="w-full pt-6 border-t border-gray-100 mt-4">
            {!story ? (
              <Button 
                variant="secondary" 
                onClick={handleGetStory} 
                className="w-full text-sm flex items-center justify-center gap-2 bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
                isLoading={isLoadingStory}
              >
                <span>✨ Need a hint? Tell me a story!</span>
              </Button>
            ) : (
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 text-left animate-fade-in">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Math Story</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{story}</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

  // Developer z@Sham Software Project Developer
