import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { store } from "../store/Store";
import { observer } from "mobx-react-lite";

const LoginPage = observer(() => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.loginPageStore.login();
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
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Email"
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
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={store.loginPageStore.password}
              onChange={(e) => (store.loginPageStore.password = e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            type="submit"
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <a style={{ color: "lightblue" }} href="/register">
            Sign Up
          </a>
        </Typography>
      </Paper>
    </Container>
  );
});

export default LoginPage;
