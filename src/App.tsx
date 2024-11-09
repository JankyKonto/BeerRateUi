import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAppBar from "./components/MyAppBar";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AddBeerPage from "./pages/AddBeerPage";
import BeerList from "./pages/BeerListPage";

const App = observer(() => {
  /*
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  */

  const theme = createTheme({
    palette: {
      mode: "light", // Light mode for background
      background: {
        default: "#f5f5f5", // Light background color
      },
      primary: {
        main: "#B8860B", // Gold color for navbar
      },
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <MyAppBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-beer" element={<AddBeerPage />} />
            <Route path="/beer-list" element={<BeerList />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
});

export default App;
