import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { useEffect } from "react";
import { getImageUrl } from "../utils/imageHelpers";

const BeerListPage = observer(() => {
  useEffect(() => {
    store.beerStore.fetch();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        p: 2,
      }}
    >
      {store.beerStore.beers.map((beer, index) => (
        <Card key={index} sx={{ width: "20%", m: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={getImageUrl(beer.image)}
              alt="Zdjęcie piwa"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {beer.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
});

export default BeerListPage;
