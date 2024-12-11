import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { store } from "../../store/Store";
import { api } from "../../service/api";
import { observer } from "mobx-react-lite";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import FactoryIcon from "@mui/icons-material/Factory";
import { BEER_KINDS } from "../../utils/data";
import { useNavigate } from "react-router-dom";

const SimilarBeers = observer(() => {
  const navigateTo = useNavigate();

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "96vw",
        padding: "20px",
        borderRadius: "10px",
        mt: 2,
        height: "22vh",
        p: 1,
      }}
    >
      <Box sx={{ height: "20%" }}>
        <Typography variant="h5" align="center">
          Podobne piwa
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", height: "80%" }}
      >
        {store.beerInfoStore.similarBeers.map((beer, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              height: "100%",
              width: "30%",
              margin: 0,
            }}
          >
            <CardActionArea
              onClick={() => navigateTo(`/beer/${beer.id}`)}
              sx={{ bgcolor: "#F1F1F1", width: "100%", height: "100%" }}
            >
              <CardMedia
                sx={{ width: "100%", height: "100%", display: "flex" }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "20%",
                  }}
                  src={api.getBeerImageUrl(beer.id)}
                  alt="Zdjęcie piwa"
                />
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      height: "25%",
                      bgcolor: "#EBB93E",
                      borderRadius: "10px",
                      pl: 1,
                      mx: 1,
                      overflow: "hidden",
                    }}
                  >
                    <DriveFileRenameOutlineIcon
                      sx={{ fontSize: "150%", mr: 2 }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "calc(100% - 50px)",
                      }}
                    >
                      {beer.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      height: "25%",
                      bgcolor: "#EBB93E",
                      borderRadius: "10px",
                      pl: 1,
                      mx: 1,
                      overflow: "hidden",
                    }}
                  >
                    <FactoryIcon sx={{ fontSize: "150%", mr: 2 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "calc(100% - 50px)",
                      }}
                    >
                      {beer.producer}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      height: "25%",
                      bgcolor: "#EBB93E",
                      borderRadius: "10px",
                      pl: 1,
                      mx: 1,
                      overflow: "hidden",
                    }}
                  >
                    <SportsBarIcon sx={{ fontSize: "150%", mr: 2 }} />
                    <Typography
                      variant="h5"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "calc(100% - 50px)",
                      }}
                    >
                      {BEER_KINDS.find((k) => k.id === beer.kind)?.name}
                    </Typography>
                  </Box>
                </Box>
              </CardMedia>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Paper>
  );
});

export default SimilarBeers;
