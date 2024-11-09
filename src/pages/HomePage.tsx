import { Container, Paper, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ mt: 15, p: 2 }}>
        <Typography variant="h2" align="center">
          Witaj w Beer App
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;
