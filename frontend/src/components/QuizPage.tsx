'use client'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { quizQuestions } from '../utils/quizQuestions.ts';
import { getBackgroundClass } from '../utils/backgroundStyle.js';

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timer, setTimer] = useState(20);
  const [score, setScore] = useState(0);

  const questions = category && quizQuestions[category]
    ? subcategory && quizQuestions[category][subcategory]
      ? quizQuestions[category][subcategory]
      : quizQuestions[category]
    : undefined;
  console.log(questions)
  useEffect(() => {
    if (!questions || currentQuestion >= questions.length || currentQuestion >= 10) {
      navigate(`/completion?score=${score}`);
      return;
    }
  
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer('');
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestion, navigate, score, questions]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    console.log(selectedAnswer)

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setCurrentQuestion((prev) => prev + 1);
    setTimer(20);
  };

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
      navigate('/');
    }
  };

  if (!questions || questions.length === 0 || !questions[currentQuestion]) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100">
        <h1 className="text-4xl font-bold mb-8">Invalid Quiz</h1>
        <p className="text-lg">The selected category or subcategory is invalid or has no questions.</p>
      </main>
    );
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 ${getBackgroundClass(category, subcategory)}`}>
      <h1 className="text-4xl font-bold mb-8">Quiz</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Question {currentQuestion + 1}</h2>
          <p className="text-lg">{questions[currentQuestion].question}</p>
        </div>
        <div className="mb-6 space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className="w-full text-left p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="text-xl font-semibold mb-4">Time remaining: {timer} seconds</div>
        <div className="text-lg mb-4">Question {currentQuestion + 1} of {Math.min(questions.length, 10)}</div>
        <div className="flex justify-center">
          <button
            onClick={handleExit}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Exit Quiz
          </button>
        </div>
      </div>
    </main>
  );
}
