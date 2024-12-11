import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../../store/Store";
import { BEER_KINDS, COUNTRIES } from "../../utils/data";

const FilterBox = observer(() => {
  return (
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
          onChange={(e) => (store.beerListPageStore.producer = e.target.value)}
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
            max={20}
            onChange={(_, newValue) => {
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
            max={120}
            value={[
              store.beerListPageStore.filterType.minIbu,
              store.beerListPageStore.filterType.maxIbu,
            ]}
            onChange={(_, newValue) => {
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

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
  );
});

export default FilterBox;
