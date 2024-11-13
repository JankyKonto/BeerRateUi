import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { store } from "../store/Store";
import { observer } from "mobx-react-lite";
import BeerInfo from "../components/beer/BeerInfo";
import ReviewsContainer from "../components/beer/ReviewsContainer";

const BeerPage = observer(() => {
  const { beerId } = useParams();

  useEffect(() => {
    if (beerId) {
      const numberId = parseInt(beerId);
      store.beerInfoStore.fetch(numberId);
      store.reviewsStore.fetch(numberId);
    }
  }, [beerId]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <BeerInfo />
      <ReviewsContainer />
    </Box>
  );
});

export default BeerPage;
