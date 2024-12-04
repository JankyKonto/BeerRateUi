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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RemindPasswordPage = observer(() => {
  const navigateTo = useNavigate();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    store.loginPageStore.reset();
  }, []);

  const handlePasswordReset = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (token) {
      const result = await store.loginPageStore.resetPassword(
        newPassword,
        token
      );
      if (result) {
        navigateTo("/");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={4}
        sx={{ padding: "20px", borderRadius: "10px", marginTop: "50px" }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Zresetuj hasło
        </Typography>
        <Collapse in={!!store.loginPageStore.errorMessage}>
          <Alert color="error">{store.loginPageStore.errorMessage}</Alert>
        </Collapse>
        {store.loginPageStore.isLoading ? (
          <LoginPageSkeleton />
        ) : (
          <Box>
            <div>
              <TextField
                label="Hasło"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px" }}
              onClick={handlePasswordReset}
            >
              Zresetuj hasło
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
});

export default RemindPasswordPage;
