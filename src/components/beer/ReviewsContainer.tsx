import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Pagination,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../../store/Store";

const ReviewsContainer = observer(() => {
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    store.reviewsStore.currentPage = value;
  };

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "40px",
        width: { xs: "94vw", sm: "94vw", md: "47vw" },
        height: { xs: "fit-content", sm: "fit-content", md: "85vh" },
        mx: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "95%" }}>
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
            value={store.reviewsStore.reviewText}
            onChange={(e) => (store.reviewsStore.reviewText = e.target.value)}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              height: "fit-content",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                flexGrow: 1,
                width: "80%",
                height: "fit-content",
              }}
            >
              <FormControl>
                <FormLabel>Smak</FormLabel>
                <Rating
                  name="simple-controlled"
                  sx={{ mr: 2 }}
                  value={store.reviewsStore.selectedTasteRate}
                  onChange={(e, newValue) => {
                    store.reviewsStore.selectedTasteRate = newValue;
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Zapach</FormLabel>
                <Rating
                  name="simple-controlled"
                  sx={{ mr: 2 }}
                  value={store.reviewsStore.selectedAromaRate}
                  onChange={(e, newValue) => {
                    store.reviewsStore.selectedAromaRate = newValue;
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Piana</FormLabel>
                <Rating
                  name="simple-controlled"
                  sx={{ mr: 2 }}
                  value={store.reviewsStore.selectedFoamRate}
                  onChange={(e, newValue) => {
                    store.reviewsStore.selectedFoamRate = newValue;
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Barwa</FormLabel>
                <Rating
                  name="simple-controlled"
                  sx={{ mr: 2 }}
                  value={store.reviewsStore.selectedColorRate}
                  onChange={(e, newValue) => {
                    store.reviewsStore.selectedColorRate = newValue;
                  }}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
                flexShrink: 0,
              }}
            >
              <Button
                variant="contained"
                onClick={() => store.reviewsStore.postReview()}
              >
                Wyślij
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", overflowY: "auto" }}>
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
                flexShrink: 1,
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ width: "20%" }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                    {review.userName}
                  </Typography>
                </Box>
              </Box>
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

              <Box
                sx={{
                  width: "100%",
                  mt: 1,
                  ml: 3,
                }}
              >
                <FormControl>
                  <FormLabel>Smak</FormLabel>
                  <Rating
                    size="small"
                    sx={{ mr: 4 }}
                    value={review.tasteRate}
                    onChange={() => {}}
                    readOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Zapach</FormLabel>
                  <Rating
                    size="small"
                    sx={{ mr: 4 }}
                    value={review.aromaRate}
                    onChange={() => {}}
                    readOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Piana</FormLabel>
                  <Rating
                    size="small"
                    sx={{ mr: 4 }}
                    value={review.foamRate}
                    onChange={() => {}}
                    readOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Barwa</FormLabel>
                  <Rating
                    size="small"
                    sx={{ mr: 4 }}
                    value={review.colorRate}
                    onChange={() => {}}
                    readOnly
                  />
                </FormControl>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          height: "5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={store.reviewsStore.pagesAmount}
          onChange={handleChange}
        />
      </Box>
    </Paper>
  );
});

export default ReviewsContainer;
