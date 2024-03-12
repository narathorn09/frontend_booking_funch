import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/Login.jsx";
import RegisterView from "./views/Register.jsx";
import CalendarView from "./views/Calendar.jsx";
// import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/*" element={<div>No page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
