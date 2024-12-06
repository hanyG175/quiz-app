'use client';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { quizQuestions } from '../utils/quizQuestions.ts';
import { getBackgroundClass } from '../utils/backgroundStyle.js';
import Loader from '../components/Loader.tsx';

// Helper function to detect RTL text
const isRTL = (text) => {
  const rtlPattern = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlPattern.test(text);
};

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
  const [isLoading, setIsLoading] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const questions =
    category && quizQuestions[category]
      ? subcategory && quizQuestions[category][subcategory]
        ? quizQuestions[category][subcategory]
        : quizQuestions[category]
      : [];

  // Console log for debugging
  console.log('Questions:', questions);
  console.log('Current Question Index:', currentQuestion);

  useEffect(() => {
    if (!questions.length) {
      setShowCompletion(true);
      return;
    }

    if (currentQuestion >= questions.length || currentQuestion >= 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowCompletion(true);
      }, 2000); // Show loader for 2 seconds
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
  }, [currentQuestion, questions]);

  const handleAnswerSelect = (answer: string) => {
    if (!questions[currentQuestion]) return;

    setSelectedAnswer(answer);

    if (answer === questions[currentQuestion]?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setCurrentQuestion((prev) => prev + 1);
    setTimer(20);
  };

  if (showCompletion) {
    localStorage.setItem('hasTakenQuiz', 'true');
    navigate('/completion?score=' + score);
  }

  if (isLoading || !questions[currentQuestion]) {
    return (
      <main
        className={`min-h-screen flex flex-col items-center justify-center p-4 ${getBackgroundClass(
          category,
          subcategory
        )}`}
      >
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <Loader />
        </div>
      </main>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-4 ${getBackgroundClass(
        category,
        subcategory
      )}`}
    >
      <h1 className="text-4xl font-bold mb-8">Quiz</h1>
      <div className="no-select w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div
          className={`no-select mb-6 ${
            isRTL(questions[currentQuestion]?.question) ? 'rtl' : 'ltr'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-2">
            Question {currentQuestion + 1}
          </h2>
          <p className="text-lg">{questions[currentQuestion]?.question}</p>
        </div>
        <div className="no-select mb-6 space-y-3">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`no-select w-full text-left p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-colors 
              ${isRTL(option) ? 'rtl' : 'ltr'}`}>
              {option}
            </button>
          ))}
        </div>
        <div className="no-select text-xl font-semibold mb-4">
          Time remaining: {timer} seconds
        </div>
        <div className="no-select text-lg mb-4">
          Question {currentQuestion + 1} of {Math.min(questions.length, 10)}
        </div>
        <div id="exitButton" className="flex justify-center"></div>
      </div>
    </main>
  );
}
