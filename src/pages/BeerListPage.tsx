import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { useEffect } from "react";
import FilterBox from "../components/beerList/FilterBox";
import BeerList from "../components/beerList/BeerList";

const BeerListPage = observer(() => {
  useEffect(() => {
    store.beerListPageStore.fetch();
  }, []);

  return (
    <Box
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      <FilterBox />
      <BeerList
        beers={store.beerListPageStore.beers}
        page={store.beerListPageStore.page}
        changePage={(_, page) => (store.beerListPageStore.page = page)}
        pagesAmount={store.beerListPageStore.pagesAmount}
      />
    </Box>
  );
});

export default BeerListPage;
