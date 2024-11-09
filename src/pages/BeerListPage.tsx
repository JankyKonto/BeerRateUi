import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { useEffect } from "react";
import { getImageUrl } from "../utils/imageHelpers";
import ReactCountryFlag from "react-country-flag";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FactoryIcon from "@mui/icons-material/Factory";
import SportsBarIcon from "@mui/icons-material/SportsBar";

const BeerListPage = observer(() => {
  useEffect(() => {
    store.beerStore.fetch();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "20%" }}></Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "80%",
          p: 2,
        }}
      >
        {store.beerStore.beers.map((beer, index) => (
          <Card key={index} sx={{ width: "20%", m: 1, bgcolor: "#FFFFFF" }}>
            <Box
              sx={{
                height: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
              }}
            >
              <ReactCountryFlag
                countryCode="PL"
                svg
                style={{ width: "20px", border: "1px solid black" }}
              />
              <Typography variant="h5">{beer.alcoholAmount}%</Typography>
            </Box>
            <CardMedia
              component="img"
              height="300"
              image={getImageUrl(beer.image)}
              alt="Zdjęcie piwa"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                <DriveFileRenameOutlineIcon
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                {beer.name}
              </Typography>
              <Typography gutterBottom>
                <FactoryIcon sx={{ mr: 1, verticalAlign: "top" }} />
                {beer.producer}
              </Typography>
              <Typography gutterBottom>
                <SportsBarIcon sx={{ mr: 1, verticalAlign: "top" }} />
                {beer.kind}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
});

export default BeerListPage;
