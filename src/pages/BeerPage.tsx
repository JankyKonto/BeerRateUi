import { Alert, Box, Collapse } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { store } from "../store/Store";
import { observer } from "mobx-react-lite";
import BeerInfo from "../components/beer/BeerInfo";
import ReviewsContainer from "../components/beer/ReviewsContainer";
import SimilarBeers from "../components/beer/SimilarBeers";

const BeerPage = observer(() => {
  const { beerId } = useParams();

  useEffect(() => {
    if (beerId) {
      const numberId = parseInt(beerId);
      store.beerInfoStore.fetch(numberId);
      store.reviewsStore.fetch(numberId);
      store.beerInfoStore.fetchSimilarBeers(numberId);
    }
  }, [beerId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <BeerInfo />
          <ReviewsContainer />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <SimilarBeers />
        </Box>
      </Box>
    </>
  );
});

export default BeerPage;
