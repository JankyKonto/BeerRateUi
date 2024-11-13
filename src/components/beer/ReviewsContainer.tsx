import {
  Box,
  Button,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../../store/Store";

const ReviewsContainer = observer(() => {
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "50px",
        width: "47vw",
        height: "80vh",
        mx: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Oceny
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          label="Wpisz treść oceny..."
          value={store.addBeerPageStore.producer}
          onChange={(e) => (store.addBeerPageStore.producer = e.target.value)}
          sx={{}}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="simple-controlled"
              sx={{ mr: 2 }}
              value={0}
              onChange={() => {}}
            />
            <Rating
              name="simple-controlled"
              sx={{ mr: 2 }}
              value={0}
              onChange={() => {}}
            />
            <Rating
              name="simple-controlled"
              sx={{ mr: 2 }}
              value={0}
              onChange={() => {}}
            />
            <Rating
              name="simple-controlled"
              sx={{ mr: 2 }}
              value={0}
              onChange={() => {}}
            />
            <Rating
              name="simple-controlled"
              sx={{ mr: 2 }}
              value={0}
              onChange={() => {}}
            />
          </Box>
          <Button fullWidth variant="contained">
            Wyślij
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "80%", overflowY: "auto" }}>
        {store.reviewsStore.reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              textWrap: "wrap",
              borderRadius: "10px",
              border: "2px solid #EBB93E",
              p: 2,
              my: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ width: "100%", mb: 1, fontWeight: "bold" }}
            >
              {review.userName}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                width: "100%",
                ml: 3,
              }}
            >
              {review.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
});

export default ReviewsContainer;
