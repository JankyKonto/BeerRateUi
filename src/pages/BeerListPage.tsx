import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  TextField,
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
import { BEERS, COUNTRIES } from "../utils/data";

const BeerListPage = observer(() => {
  useEffect(() => {
    store.beerStore.fetch();
  }, []);

  return (
    <Box
      sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
    >
      <Box
        sx={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: "20px",
            borderRadius: "10px",
            mt: 4,
            ml: 4,
            display: "flex",
            flexWrap: "wrap",
            height: "fit-content",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" component="h1" gutterBottom align="center">
              Filtrowanie
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Nazwa piwa"
            value={store.addBeerPageStore.name}
            onChange={(e) => (store.addBeerPageStore.name = e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Producent piwa"
            value={store.addBeerPageStore.producer}
            onChange={(e) => (store.addBeerPageStore.producer = e.target.value)}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            fullWidth
            options={BEERS}
            value={store.addBeerPageStore.kind}
            onChange={(_, newValue) =>
              (store.addBeerPageStore.kind = newValue ? newValue : "")
            }
            renderInput={(params) => (
              <TextField {...params} label="Wybierz rodzaj piwa" />
            )}
            getOptionLabel={(option) => option}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            fullWidth
            options={COUNTRIES}
            value={store.addBeerPageStore.originCountry}
            onChange={(_, newValue) =>
              (store.addBeerPageStore.originCountry = newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Wybierz kraj pochodzenia" />
            )}
            getOptionLabel={(option) => option.name_pl}
            sx={{ mb: 2 }}
          />

          <TextField
            type="number"
            fullWidth
            label="Zawartość alkoholu"
            value={
              store.addBeerPageStore.alcoholAmount !== null
                ? store.addBeerPageStore.alcoholAmount
                : ""
            }
            onChange={(e) => {
              const newValue =
                e.target.value === "" ? null : Number(e.target.value);
              store.addBeerPageStore.alcoholAmount = newValue;
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            type="number"
            fullWidth
            label="IBU"
            slotProps={{ htmlInput: { step: 0.1 } }}
            value={
              store.addBeerPageStore.ibu !== null
                ? store.addBeerPageStore.ibu
                : ""
            }
            onChange={(e) => {
              const newValue =
                e.target.value === "" ? null : Number(e.target.value);
              store.addBeerPageStore.ibu = newValue;
            }}
            sx={{ mb: 2 }}
          />

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button color="primary" variant="contained">
              Filtruj
            </Button>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "80%",
          p: 2,
        }}
      >
        {store.beerStore.beers.map((beer, index) => (
          <Card key={index} sx={{ width: "18%", minWidth: "220px", m: 1 }}>
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
                countryCode={beer.originCountry}
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
