import { observer } from "mobx-react-lite";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";

const App = observer(() => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        {isNavbarExpanded ? (
          <></>
        ) : (
          <div className="app-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
});

export default App;
