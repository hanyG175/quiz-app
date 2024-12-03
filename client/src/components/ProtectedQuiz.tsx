import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireNoQuiz = ({ children }) => {
  // Get hasTakenQuiz status from localStorage or a global state (e.g., Redux or Context API)
  const hasTakenQuiz = localStorage.getItem('hasTakenQuiz') === 'true';
  // If the user has already taken the quiz, redirect to the completion page
  if (hasTakenQuiz) {
    return <Navigate to="/completion" replace />;
  }

  // Otherwise, render the child components (the protected page)
  return children;
};

export default RequireNoQuiz;
