import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaClipboardList, FaTrophy, FaCog } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeQuizzes: 0,
    completedQuizzes: 0,
    averageScore: 0.00,
  });

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/quiz/leaderboard');
          const data = await response.json();

          const usersCount = data.length;
          const activeQuizzesCount = data.filter((user) => !user.hasTakenQuiz).length;
          const completedQuizzesCount = data.filter((user) => user.hasTakenQuiz ).length;
          const averageScore = data.reduce((total, user) => total + user.score, 0) / usersCount;
          setStats({
            totalUsers: usersCount,
            activeQuizzes: activeQuizzesCount,
            completedQuizzes: completedQuizzesCount,
            averageScore: Number(averageScore.toFixed(2)),
          });

        } catch (error) {
          console.error('Failed to fetch data:', error);
      };
    };
  
      fetchData();
    
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <Link to="/" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                Back to Site
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('adminLoggedIn');
                  window.location.href = '/admin/login';
                }}
                className="ml-4 text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome, Admin</h1>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <FaUsers className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{stats.totalUsers}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <FaClipboardList className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Quizzes</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{stats.activeQuizzes}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <FaTrophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Completed Quizzes</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{stats.completedQuizzes}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                    <FaCog className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Average Score</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{stats.averageScore}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <ul className="divide-y divide-gray-200">
                <li className="py-4">
                    <Link to="/admin/leaderboard" className="text-indigo-600 hover:text-indigo-900">View Leaderboard</Link>
                  </li>
                  <li className="py-4">
                    <Link to="/admin/create-quiz" className="text-indigo-600 hover:text-indigo-900">Create New Quiz</Link>
                  </li>
                  <li className="py-4">
                    <Link to="/admin/manage-users" className="text-indigo-600 hover:text-indigo-900">Manage Users</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-4">Coming Soon...</li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

