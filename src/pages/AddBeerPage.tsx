import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { store } from "../store/Store";
import { observer } from "mobx-react-lite";

const AddBeerPage = observer(() => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

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
        }}
      >
        <Box sx={{ width: "100%", mb: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Dodaj piwo
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          <Box sx={{ display: "flex", height: "50vh", width: "100%" }}>
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
              <TextField
                fullWidth
                label="Gatunek piwa"
                value={store.addBeerPageStore.kind}
                onChange={(e) => (store.addBeerPageStore.kind = e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Kraj pochodzenia"
                value={store.addBeerPageStore.originCountry}
                onChange={(e) =>
                  (store.addBeerPageStore.originCountry = e.target.value)
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Zawartość alkoholu"
                value={store.addBeerPageStore.alcoholAmount}
                onChange={(e) =>
                  (store.addBeerPageStore.alcoholAmount = Number(
                    e.target.value
                  ))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                type="number"
                fullWidth
                label="IBU"
                slotProps={{ htmlInput: { step: 0.1 } }}
                value={store.addBeerPageStore.ibu}
                onChange={(e) =>
                  (store.addBeerPageStore.ibu = Number(e.target.value))
                }
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
              ) : null}
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
