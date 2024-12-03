import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <><ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/quiz-intro" element={<ProtectedRoute><RequireNoQuiz><QuizIntro /></RequireNoQuiz></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><RequireNoQuiz><QuizPage /></RequireNoQuiz></ProtectedRoute>} />
              <Route path="/completion" element={<ProtectedRoute><RequireNoResult><CompletionPage /></RequireNoResult></ProtectedRoute>} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router></>
  );
}

export default App;