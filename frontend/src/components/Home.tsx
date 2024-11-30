import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-800 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
          Welcome to the Science Creativity Club!
        </h1>
        <p className="text-xl mb-6 text-gray-600">
          Igniting young minds with the wonders of science and innovation
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">
            🏆 Exciting Competition Alert! 🏆
          </h2>
          <p className="text-lg mb-4">
            We're thrilled to announce our first "MindQuest" competition!
          </p>
          <ul className="text-left list-disc list-inside mb-4">
            <li>Test your knowledge across various scientific disciplines</li>
            <li>Solve creative problems and think outside the box</li>
            <li>Compete with peers and win amazing prizes</li>
          </ul>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="bg-yellow-100 rounded-full p-4">
            <span className="text-4xl" role="img" aria-label="microscope">🔬</span>
          </div>
          <div className="bg-green-100 rounded-full p-4">
            <span className="text-4xl" role="img" aria-label="dna">🧬</span>
          </div>
          <div className="bg-blue-100 rounded-full p-4">
            <span className="text-4xl" role="img" aria-label="rocket">🚀</span>
          </div>
        </div>
        <Link 
          to="/signup" 
          className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition duration-300 transform hover:scale-105"
        >
          Join the Challenge!
        </Link>
      </div>
      <div className="mt-8 text-white text-center">
        <h3 className="text-xl font-semibold mb-2">What Is Our Club All About ?</h3>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-filter backdrop-blur-lg">
            <span className="text-2xl mb-2" role="img" aria-label="light bulb">💡</span>
            <p>Spark Creativity</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-filter backdrop-blur-lg">
            <span className="text-2xl mb-2" role="img" aria-label="atom">⚛️</span>
            <p>Explore Science</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-filter backdrop-blur-lg">
            <span className="text-2xl mb-2" role="img" aria-label="people">👥</span>
            <p>Make Friends</p>
          </div>
        </div>
      </div>
    </div>
  );
}

