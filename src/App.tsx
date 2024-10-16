import { observer } from "mobx-react-lite";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = observer(() => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          isNavbarExpanded={isNavbarExpanded}
          setIsNavbarExpanded={setIsNavbarExpanded}
        />
        {isNavbarExpanded ? (
          <></>
        ) : (
          <div className="app-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
});

export default App;
