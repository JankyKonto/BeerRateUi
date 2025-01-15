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
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CenteredModal from "../components/CenteredModal";

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
          <Link to="/register" style={{ color: "lightblue" }}>
            Zarejestruj się
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ marginTop: "10px" }}>
          Nie pamiętasz hasła?{" "}
          <a
            style={{ color: "lightblue", textDecoration: "underline" }}
            onClick={() => {
              store.loginPageStore.isResetPasswordModalShown = true;
            }}
          >
            Przypomnij
          </a>
        </Typography>
      </Paper>

      <CenteredModal
        open={store.loginPageStore.isResetPasswordModalShown}
        onClose={() => {
          store.loginPageStore.isResetPasswordModalShown = false;
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Resetuj hasło
          </Typography>
          <TextField
            label="Podaj swój email"
            type="email"
            variant="outlined"
            fullWidth
            required
            sx={{ my: 2 }}
            value={store.loginPageStore.resetEmail}
            onChange={(e) => (store.loginPageStore.resetEmail = e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={() => store.loginPageStore.sendPasswordResetRequest()}
          >
            Zresetuj hasło
          </Button>
        </Box>
      </CenteredModal>
    </Container>
  );
});

export default LoginPage;
