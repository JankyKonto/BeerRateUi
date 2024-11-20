import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { store } from "../store/Store";
import { observer } from "mobx-react-lite";
import LoginPageSkeleton from "../components/skeletons/LoginPageSkeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = observer(() => {
  const navigateTo = useNavigate();

  useEffect(() => {
    store.loginPageStore.reset();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await store.loginPageStore.login();
    if (!store.loginPageStore.errorMessage) {
      navigateTo("/");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={4}
        sx={{ padding: "20px", borderRadius: "10px", marginTop: "50px" }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Collapse in={!!store.loginPageStore.errorMessage}>
          <Alert color="error">{store.loginPageStore.errorMessage}</Alert>
        </Collapse>
        {store.loginPageStore.isLoading ? (
          <LoginPageSkeleton />
        ) : (
          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Adres email"
                type="email"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={store.loginPageStore.email}
                onChange={(e) => (store.loginPageStore.email = e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="Hasło"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={store.loginPageStore.password}
                onChange={(e) =>
                  (store.loginPageStore.password = e.target.value)
                }
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px" }}
              type="submit"
            >
              Zaloguj się
            </Button>
          </Box>
        )}
        <Typography variant="body2" align="center" sx={{ marginTop: "10px" }}>
          Nie masz konta?{" "}
          <a style={{ color: "lightblue" }} href="/register">
            Zarejestruj się
          </a>
        </Typography>
      </Paper>
    </Container>
  );
});

export default LoginPage;
