import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView.jsx";
import RegisterView from "./views/RegisterView.jsx";
import CalendarView from "./views/CalendarView.jsx";
import VerifyEmailView from "./views/VerifyEmailView.jsx";
import "./css/animation.css";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/verify-email" element={<VerifyEmailView />} />
        <Route path="/*" element={<div>No page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
