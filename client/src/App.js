import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import SignupPage from "./components/SignupPage.tsx";
import QuizIntro from "./components/QuizIntro.tsx";
import QuizPage from "./components/QuizPage.tsx";
import CompletionPage from "./components/CompletionPage.tsx";
import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireNoQuiz from "./components/ProtectedQuiz.tsx";
import RequireNoResult from "./components/ProtectedResult.tsx";
import LeaderBoard from "./components/LeaderBoard.tsx";
import AdminLogin from './components/AdminLogin.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

function App() {
  const [isAdmin, setIsAdmin] = React.useState(() => {
    // Retrieve isAdmin state from localStorage or default to false
    return localStorage.getItem('isAdmin') === 'true';
  });

  const handleAdminLogin = (authenticated) => {
    setIsAdmin(authenticated);
    localStorage.setItem('isAdmin', String(authenticated)); // Persist state
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
            <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/leaderboard" element={isAdmin ? <LeaderBoard isAdminView={true} /> : <Navigate to="/admin/login" />} />

            {/* Main Application Routes */}
            <Route path="/" element={<><Header /><main className="flex-grow"><Home /></main><Footer /></>} />
            <Route path="/signup" element={<><Header /><main className="flex-grow"><SignupPage /></main><Footer /></>} />
            <Route path="/login" element={<><Header /><main className="flex-grow"><Login /></main><Footer /></>} />
            <Route path="/quiz-intro" element={
              <ProtectedRoute>
                <RequireNoQuiz>
                  <><Header /><main className="flex-grow"><QuizIntro /></main><Footer /></>
                </RequireNoQuiz>
              </ProtectedRoute>
            } />
            <Route path="/quiz" element={
              <ProtectedRoute>
                <RequireNoQuiz>
                  <><Header /><main className="flex-grow"><QuizPage /></main><Footer /></>
                </RequireNoQuiz>
              </ProtectedRoute>
            } />
            <Route path="/completion" element={
              <ProtectedRoute>
                <RequireNoResult>
                  <><Header /><main className="flex-grow"><CompletionPage /></main><Footer /></>
                </RequireNoResult>
              </ProtectedRoute>
            } />

            {/* Catch-All Route for 404 */}
            <Route path="*" element={<main className="flex-grow text-center"><h1>404 - Page Not Found</h1></main>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
