import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import SignupPage from "./components/SignupPage.tsx";
import QuizIntro from "./components/QuizIntro.tsx";
import QuizPage from "./components/QuizPage.tsx";
import CompletionPage from "./components/CompletionPage.tsx";
import Home from './components/Home.tsx';
;
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/quiz-intro" element={<QuizIntro />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/completion" element={<CompletionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;