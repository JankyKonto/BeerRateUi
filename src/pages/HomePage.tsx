import { Container, Paper, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ mt: 15 }}>
        <Typography>Welcome to he beer app</Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;
