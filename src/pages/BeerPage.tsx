import { Alert, Box, Collapse } from "@mui/material";
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
    <>
      <Collapse in={false} sx={{ mx: 2, my: 2 }}>
        <Alert color="error">Test error</Alert>
      </Collapse>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          justifyContent: "center",
        }}
      >
        <BeerInfo />
        <ReviewsContainer />
      </Box>
    </>
  );
});

export default BeerPage;
