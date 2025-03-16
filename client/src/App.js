import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage"; // Компонент регистрации
import EventPage from "./pages/event/EventPage"; // Компонент регистрации
import "./App.css";
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

// const authClient = new AuthClient("http://localhost:8000");
const innerTheme = createTheme({
  palette: {
    secondary: {
      main: green[500],
    },
    primary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={innerTheme}>
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
    </ThemeProvider>
  );
}

export default App;
