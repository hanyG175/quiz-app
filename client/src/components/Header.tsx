import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const hasTakenQuiz = localStorage.getItem('hasTakenQuiz') === 'true';
  const score = localStorage.getItem('score');
  const category = localStorage.getItem('category');
  const subcategory = localStorage.getItem('subcategory');
  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      console.log('token')
      // Optionally, clear other user-related data
      localStorage.removeItem('userData');
      navigate('/'); // Redirect to login page after signing out
    } else {
      navigate('/login'); // If not logged in, go to login page
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left Spacer */}
        {/* Logo */}
       
        <div className="flex-1 flex justify-start"> <div className="flex items-center">
            <img
              src="/logo.jpg"
              alt="Workflow"
              className="h-16 w-auto"
            />
          </div></div>

        {/* Centered Logo and Title */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="h-8 w-8 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span className="no-select font-bold text-lg md:text-xl text-gray-800">
              Scientific Creativity Club
            </span>
          </Link>
        </div>
        {/* Right-aligned Navigation */}
        <nav className="hidden md:flex flex-1 justify-end space-x-4">
          <Link
            to="/"
            className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-md text-sm transition duration-150 ease-in-out"
          >
            Home
          </Link>

          {isLoggedIn ? (
              hasTakenQuiz ? (
                <Link
                  to={`/completion?${score}`}
                  className="bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out"
                >
                  Check Your Score!
                </Link>
              ) : (
                <Link
                  to={`/quiz-intro?category=${category}&subcategory=${subcategory}`}
                  className="bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out"
                >
                  Take Quiz
                </Link>
              )
            ) : (
              <Link
                to="/signup"
                className="bg-gradient-to-r from-pink-500 to-red-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-700 text-white font-bold px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out animate-bounce-light"
              >
                Join Challenge
              </Link>
            )}


          <button
            id="auth-button"
            onClick={handleAuthAction}
            className="text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 hover:bg-gray-200 p-2 rounded-md"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
          <Link
            to="/"
            className="block text-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 text-gray-800 font-bold px-4 py-2 rounded-md text-sm transition duration-150 ease-in-out mb-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {isLoggedIn ? (
            <Link
              to="/"
              className="block text-center bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out mb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Have Fun!
            </Link>
          ) : (
            <Link
              to="/signup"
              className="block text-center bg-gradient-to-r from-pink-500 to-red-600 hover:bg-gradient-to-r hover:from-pink-400 hover:to-red-500 text-white font-bold px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out animate-bounce-light mb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Challenge
            </Link>
          )}

          <button
            id="auth-button-mobile"
            onClick={handleAuthAction}
            className="block w-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </nav>
      )}
    </div>
  </header>
  );
}