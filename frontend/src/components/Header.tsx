import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Placeholder for spacing */}
            <div className="flex-1 flex items-center justify-start">
                <img
                src="/logo.jpg"
                alt="Workflow"
                className="h-20 w-auto"
                />
            </div>
  
            {/* Centered Logo and Title */}

            <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-black-600"
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
              <span className="font-bold text-xl text-gray-800">
                Scientific Creativity Club
              </span>
            </Link>
            </div>
  
            {/* Right-aligned Navigation */}
            <nav className="hidden md:flex flex-1 justify-end space-x-4">
              <Link
                to="/"
                className="text-black hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/signup"
                className="text-black hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Join Challenge 
              </Link>
             
            </nav>
  
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-800 hover:bg-gray-200 p-2 rounded-md">
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
        </div>
      </header>
    );
  }
  