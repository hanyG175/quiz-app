import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireNoResult = ({ children }) => {
  // Get hasTakenQuiz status from localStorage or a global state (e.g., Redux or Context API)
  const hasTakenQuiz = localStorage.getItem('hasTakenQuiz') === 'true';

  // If the user has not taken the quiz, redirect to the quiz intro page with category and subcategory params
  if (!hasTakenQuiz) {
    const category = localStorage.getItem('category') || '';
    const subcategory = localStorage.getItem('subcategory') || '';
    return <Navigate to={`/quiz-intro?category=${category}&subcategory=${subcategory}`} replace />;
  }

  // Otherwise, render the child components (the protected page)
  return children;
};

export default RequireNoResult;
