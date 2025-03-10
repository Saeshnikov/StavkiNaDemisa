import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage"; // Компонент регистрации
import EventPage from "./pages/event/EventPage"; // Компонент регистрации
import "./App.css";


// const authClient = new AuthClient("http://localhost:8000");

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<RegisterPage/>}
        />
        <Route
          path="/events"
          element={<EventPage/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
