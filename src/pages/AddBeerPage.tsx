import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Collapse,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { store } from "../store/Store";
import { observer } from "mobx-react-lite";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { BEER_KINDS, COUNTRIES } from "../utils/data";

const AddBeerPage = observer(() => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    store.addBeerPageStore.reset();
  }, []);

  const handleUploadClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      store.addBeerPageStore.beerImage = files[0];
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.addBeerPageStore.submit();
  };

  return (
    <Container>
      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          borderRadius: "10px",
          marginTop: "50px",
          display: "flex",
          flexWrap: "wrap",
          height: "fit-content",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Dodaj piwo
          </Typography>
        </Box>
        <Collapse
          in={store.addBeerPageStore.isInfoAlertVisible}
          sx={{ width: "100%", mb: 2 }}
        >
          <Alert color="info">Dodano piwo</Alert>
        </Collapse>
        <Collapse
          in={!!store.addBeerPageStore.errorMessage}
          sx={{ width: "100%", mb: 2 }}
        >
          <Alert color="error">{store.addBeerPageStore.errorMessage}</Alert>
        </Collapse>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ width: "50%" }}>
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
                onChange={(e) =>
                  (store.addBeerPageStore.producer = e.target.value)
                }
                sx={{ mb: 2 }}
              />

              <Autocomplete
                fullWidth
                options={BEER_KINDS}
                value={store.addBeerPageStore.kind}
                onChange={(_, newValue) =>
                  (store.addBeerPageStore.kind = newValue ? newValue : null)
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
            </Box>

            <input
              type="file"
              style={{ display: "none" }}
              ref={imageInputRef}
              onChange={handleFileUpload}
            />

            <Box
              sx={{
                width: "50%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {store.addBeerPageStore.previewUrl ? (
                <img
                  src={store.addBeerPageStore.previewUrl}
                  style={{ maxWidth: "80%", maxHeight: "80%" }}
                />
              ) : (
                <ImageNotSupportedIcon sx={{ width: 25 }} />
              )}
            </Box>
          </Box>

          <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{ width: 300 }}
            >
              Dodaj
            </Button>
          </Box>

          <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ width: 300 }}
              onClick={handleUploadClick}
            >
              Dodaj zdjęcie
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
});

export default AddBeerPage;
