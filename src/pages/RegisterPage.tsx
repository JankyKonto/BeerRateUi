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
import RegisterPageSkeleton from "../components/skeletons/RegisterPageSkeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterPage = observer(() => {
  const navigateTo = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await store.registerPageStore.register();
    if (!store.registerPageStore.errorMessage) {
      navigateTo("/");
    }
  };

  useEffect(() => {
    store.registerPageStore.reset();
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ padding: "20px", marginTop: "50px" }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Rejestracja
        </Typography>
        <Collapse in={!!store.registerPageStore.errorMessage}>
          <Alert color="error">{store.registerPageStore.errorMessage}</Alert>
        </Collapse>
        {store.registerPageStore.isLoading ? (
          <RegisterPageSkeleton />
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Nazwa użytkownika"
              type="text"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={store.registerPageStore.username}
              onChange={(e) =>
                (store.registerPageStore.username = e.target.value)
              }
            />
            <TextField
              label="Adres email"
              type="email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={store.registerPageStore.email}
              onChange={(e) => (store.registerPageStore.email = e.target.value)}
            />
            <TextField
              label="Hasło"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={store.registerPageStore.password}
              onChange={(e) =>
                (store.registerPageStore.password = e.target.value)
              }
              error={store.registerPageStore.isPasswordInvalid}
            />
            <TextField
              label="Powtórz hasło"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={store.registerPageStore.repeatedPassword}
              onChange={(e) =>
                (store.registerPageStore.repeatedPassword = e.target.value)
              }
              error={store.registerPageStore.isPasswordInvalid}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px" }}
            >
              Zarejestruj się
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
});

export default RegisterPage;
