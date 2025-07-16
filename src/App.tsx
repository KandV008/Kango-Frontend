import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import DashboardPage from "./pages/dashboard";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<DashboardPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
