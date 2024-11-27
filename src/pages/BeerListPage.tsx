import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FactoryIcon from "@mui/icons-material/Factory";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { BEER_KINDS, COUNTRIES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { api } from "../service/api";

const BeerListPage = observer(() => {
  const navigateTo = useNavigate();

  useEffect(() => {
    store.beerListPageStore.fetch();
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
          minWidth: "300px",
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
            value={store.beerListPageStore.name}
            onChange={(e) => (store.beerListPageStore.name = e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Producent piwa"
            value={store.beerListPageStore.producer}
            onChange={(e) =>
              (store.beerListPageStore.producer = e.target.value)
            }
            sx={{ mb: 2 }}
          />

          <Autocomplete
            fullWidth
            options={BEER_KINDS}
            value={store.beerListPageStore.kind}
            onChange={(_, newValue) =>
              (store.beerListPageStore.kind = newValue ? newValue : null)
            }
            renderInput={(params) => (
              <TextField {...params} label="Wybierz rodzaj piwa" />
            )}
            getOptionLabel={(option) => option.name}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            fullWidth
            options={COUNTRIES}
            value={store.beerListPageStore.originCountry}
            onChange={(_, newValue) =>
              (store.beerListPageStore.originCountry = newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Wybierz kraj pochodzenia" />
            )}
            getOptionLabel={(option) => option.name_pl}
            sx={{ mb: 2 }}
          />

          <Box sx={{ width: "100%", px: 1 }}>
            <Typography gutterBottom>Zawartość alkoholu</Typography>
            <Slider
              value={[
                store.beerListPageStore.filterType.minAlcoholAmount,
                store.beerListPageStore.filterType.maxAlcoholAmount,
              ]}
              onChange={(e, newValue) => {
                if (Array.isArray(newValue)) {
                  store.beerListPageStore.filterType.minAlcoholAmount =
                    newValue[0];
                  store.beerListPageStore.filterType.maxAlcoholAmount =
                    newValue[1];
                }
              }}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ width: "100%", px: 1 }}>
            <Typography gutterBottom>IBU</Typography>
            <Slider
              min={0}
              max={1000}
              value={[
                store.beerListPageStore.filterType.minIbu,
                store.beerListPageStore.filterType.maxIbu,
              ]}
              onChange={(e, newValue) => {
                if (Array.isArray(newValue)) {
                  store.beerListPageStore.filterType.minIbu = newValue[0];
                  store.beerListPageStore.filterType.maxIbu = newValue[1];
                }
              }}
              valueLabelDisplay="auto"
            />
          </Box>

          <Select
            fullWidth
            sx={{ my: 1 }}
            value={store.beerListPageStore.filterType.sortType}
            onChange={(e) =>
              (store.beerListPageStore.sortType = Number(e.target.value))
            }
          >
            <MenuItem value={0}>Sortuj po nazwie</MenuItem>
            <MenuItem value={1}>Sortuj po zawartości alkoholu</MenuItem>
            <MenuItem value={2}>Sortuj po IBU</MenuItem>
          </Select>

          <FormControlLabel
            control={
              <Checkbox
                checked={store.beerListPageStore.filterType.isAscending}
                onChange={(e) => {
                  store.beerListPageStore.filterType.isAscending =
                    e.target.checked;
                }}
              />
            }
            label="Sortuj rosnąco"
          />

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => store.beerListPageStore.filter()}
            >
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
        {store.beerListPageStore.beers.map((beer, index) => (
          <Card
            key={index}
            className="MuiButtonBase-root"
            sx={{ width: "18%", minWidth: "220px", m: 1 }}
          >
            <CardActionArea
              onClick={() => navigateTo(`/beer/${beer.id}`)}
              sx={{ height: "100%" }}
            >
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
                <Typography variant="h5">alk. {beer.alcoholAmount}%</Typography>
              </Box>
              <CardMedia
                component="img"
                height="300"
                image={api.getBeerImageUrl(beer.id)}
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
                  {BEER_KINDS.find((k) => k.id === beer.kind)?.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 1,
          }}
        >
          <Pagination
            page={store.beerListPageStore.page}
            onChange={(e, value) => (store.beerListPageStore.page = value)}
            count={store.beerListPageStore.pagesAmount}
          />
        </Box>
      </Box>
    </Box>
  );
});

export default BeerListPage;
