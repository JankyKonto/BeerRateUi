import { observer } from "mobx-react-lite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAppBar from "./components/MyAppBar";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

const App = observer(() => {
  //const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const theme = createTheme({
    palette: {
      mode: "dark", // Switch to dark mode
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <MyAppBar />
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
});

export default App;
