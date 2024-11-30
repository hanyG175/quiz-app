'use client'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
export default function Completion() {
const navigate = useNavigate();
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const score = searchParams.get('score')

  
  const handleBackHome = () => {
    navigate('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/bg10.jpeg')" }}
    >
      <h1 className="text-4xl font-bold mb-8">Quiz Completed 🎉</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
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
            Back to Home
          </button>
        </div>
      </div>
    </main>
  )
}


