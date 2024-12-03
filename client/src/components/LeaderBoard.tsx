import React, { useState, useEffect } from 'react';
import { FaMedal } from 'react-icons/fa';

const ITEMS_PER_PAGE = 5;

export default function Leaderboard() {
  interface UserData {
    email: string;
    name: string;
    grade: number;
    score: number;
  }
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState<UserData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://quiz-app-serve.onrender.com/api/quiz/leaderboard');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const sorted = [...users].sort((a: any, b: any) => b.score - a.score);
    setSortedData(sorted);
  }, [users]);

  const filteredData = selectedCategory === 'All' 
    ? sortedData 
    : sortedData.filter((item: any) => item.category === selectedCategory || item.subcategory === selectedCategory);

  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const categories = ['All', "History/Geography", ...new Set(users.map((item: any) => item.subcategory).filter(Boolean))];

  const exportScores = async () => {
    try {
      const response = await fetch('https://quiz-app-serve.onrender.com/api/quiz/export-scores');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'competition_scores.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to export scores');
      }
    } catch (error) {
      console.error('Error exporting scores:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Leaderboard</h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Filter by Field:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item, index) => {
                const rank = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                let rowClass = '';
                let medal: JSX.Element | null = null;
                if (rank === 1) {
                  rowClass = 'bg-yellow-100';
                  medal = <FaMedal className="text-yellow-500" />;
                } else if (rank === 2) {
                  rowClass = 'bg-gray-100';
                  medal = <FaMedal className="text-gray-400" />;
                } else if (rank === 3) {
                  rowClass = 'bg-yellow-50';
                  medal = <FaMedal className="text-yellow-700" />;
                }
                return (
                  <tr key={item.email} className={rowClass}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rank} {medal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="flex justify-center">
          <button
            onClick={exportScores}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export to a CSV
          </button>
        </div>
        </div>
        
      </div>
      
    </div>
  );
}
