'use client';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function QuizIntro() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const [quizStatus, setQuizStatus] = useState(localStorage.getItem('quizStatus') || ''); 


  const handleStartQuiz = () => {
    setQuizStatus('inProgress');
    localStorage.setItem('quizStatus', 'inProgress');
    navigate(`/quiz?category=${category}&subcategory=${subcategory}`);
  };
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-4xl font-bold mb-8">Quiz Introduction</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl text-center font-semibold mb-2">Welcome to the Quiz!</h2>
          <p className="text-lg mb-4 text-center">You are about to begin the <b className="font-semibold text-blue-500">{category}</b> quiz<b className="font-semibold text-blue-500">{subcategory ? ` in ${subcategory}` : ''}</b>.</p>
          <ul className="text-left text-lg list-disc list-inside mb-4">
            <li>The quiz consists of 10 questions, and you’ll have 20 seconds to answer each one.</li>
            <li>To ensure fairness, you will not be able to go back to previous questions.</li>
            <li>Once you start, you <b><u>must</u></b> complete the quiz. If you exit midway, you will lose your opportunity to participate again.</li>
          </ul>
          <br/>
          <p className="text-lg mb-4"><strong>Good luck!</strong></p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleStartQuiz}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
