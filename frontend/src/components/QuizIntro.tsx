'use client'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function QuizIntro() {
  const navigate = useNavigate()
  const location =  useLocation()
  const searchParams = new URLSearchParams(location.search)
  const category = searchParams.get('category') || ''
  const subcategory = searchParams.get('subcategory') || ''

  const handleStartQuiz = () => {
    navigate(`/quiz?category=${category}&subcategory=${subcategory}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-4xl font-bold mb-8">Quiz Introduction</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Welcome to the Quiz!</h2>
          <p className="text-lg mb-4">You are about to start the {category} quiz{subcategory ? ` in ${subcategory}` : ''}.</p>
          <p className="text-lg">There will be 10 questions, and you'll have 20 seconds for each question. Good luck!</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleStartQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </main>
  )
}

