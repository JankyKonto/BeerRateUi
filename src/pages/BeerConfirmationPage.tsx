import { Box } from "@mui/material";
import BeerList from "../components/beerList/BeerList";
import { store } from "../store/Store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const BeerConfirmationPage = observer(() => {
  useEffect(() => {
    store.beerConfirmationPageStore.fetch();
  }, []);

  return (
    <Box
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      <BeerList
        beers={store.beerConfirmationPageStore.beers}
        isConfirmation
        page={store.beerConfirmationPageStore.page}
        changePage={(_, page) => (store.beerConfirmationPageStore.page = page)}
        pagesAmount={store.beerConfirmationPageStore.pagesAmount}
      />
    </Box>
  );
});

export default BeerConfirmationPage;
