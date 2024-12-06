'use client';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Completion() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [score, setScore] = useState<number | null>(null);

  const token = localStorage.getItem('token');
  const qScore = parseInt(localStorage.getItem('score')|| '', 10);
  const accessedFromQuiz = searchParams.has('score');

  useEffect(() => {
    if (accessedFromQuiz) {
      const quizScore = parseInt(searchParams.get('score') || '', 10);
      setScore(quizScore);

      if (token ) {
        axios
          .post('https://quiz-app-serve.onrender.com/api/quiz/submit-score', { score: quizScore }, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log('Score submitted successfully:', response.data);
            localStorage.setItem('hasTakenQuiz', 'true');
            
          })
          .catch((error) => {
            console.error('Error submitting score:', error);
          });
      }
    } else if (token) {
      console.log(qScore);
      setScore(qScore);
    } else {
      navigate('/login');
    }
  }, [token, accessedFromQuiz, navigate, qScore]);

  const handleBackHome = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 min-h-screen bg-cover bg-center bg-no-repeat"
    rel="preload"
    style={{ backgroundImage: "url('/images/bg10.webp')"}}
    >
      <h1 className="text-4xl font-bold mb-8">Quiz Completed 🎉</h1>
      <div className="max-w-md no-select w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
          <p className="text-lg mb-4">You have completed the test. We appreciate your participation!</p>
          <p className="text-xl font-bold">Your score: {score} out of 10</p>
          <br />
          <p className="text-lg mb-4">
            Keep an 👁️ on your 📬.
          </p>
          <p className="text-lg mb-4">
            Who knows? Even YOU might be one of our winners 🏆.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleBackHome}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign Out & Back to Home
          </button>
        </div>
        </div>

        <div className="bg-white no-select rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Stay Connected!</h2>
          <p className="text-lg mb-6 text-gray-600">
            While you're waiting for the final results, why not check out our Instagram page for the latest updates and exciting science content?
          </p>
          <a
            href="https://www.instagram.com/sc_club19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105 animate-bounce-light"
          >
            Visit Our Instagram
          </a>
        </div>
      </div>
    </main>
  )
}


