import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView.jsx";
import RegisterView from "./views/RegisterView.jsx";
import CalendarView from "./views/CalendarView.jsx";
import VerifyEmail from "./views/VerifyEmail.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/*" element={<div>No page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
