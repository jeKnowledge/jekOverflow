import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import './App.css';
import './assets/css/global.css';
import HomePage from './pages/HomePage/HomePage';
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import MakeQuestionPage from "./pages/MakeQuestionPage/MakeQuestionPage";
import AllQuestionsPage from "./pages/AllQuestionsPage/AllQuestionsPage";
import AllUsersPage from "./pages/AllUsersPage/AllUsersPage";
import UserPage from "./pages/UserPage/UserPage";
import TagsPage from "./pages/TagsPage/TagsPage"
import LoginPage from "./pages/LoginPage/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/home/" element={<HomePage />} />
        <Route path="questions/:id/" element={<QuestionPage />} />
        <Route path="questions/" element={<AllQuestionsPage />} />
        <Route path="make-question/" element={<MakeQuestionPage />} />
        <Route path="users/:id/" element={<UserPage />} />
        <Route path="users/" element={<AllUsersPage />} />
        <Route path="tags/" element={<TagsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
