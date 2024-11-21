import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";
import { store } from "../../store/Store";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FactoryIcon from "@mui/icons-material/Factory";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import PublicIcon from "@mui/icons-material/Public";
import PercentIcon from "@mui/icons-material/Percent";
import SpaIcon from "@mui/icons-material/Spa";
import { observer } from "mobx-react-lite";

const BeerInfo = observer(() => {
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "40px",
        width: { xs: "94vw", sm: "94vw", md: "47vw" },
        height: "85vh",
        mx: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Informacje o piwie
      </Typography>
      <Box sx={{ display: "flex", height: "90%", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              maxHeight: "80%",
              minHeight: "250px",
              aspectRatio: "1 / 1.75",
            }}
          >
            <Avatar
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
              src={store.beerInfoStore.imageUrl}
            />
          </Box>
          <Rating
            precision={0.5}
            name="read-only"
            sx={{ mt: 2 }}
            value={5}
            onChange={() => {}}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "13%",
              bgcolor: "#EBB93E",
              borderRadius: "10px",
              pl: 1,
              my: 1,
            }}
          >
            <DriveFileRenameOutlineIcon sx={{ fontSize: "250%", mr: 2 }} />
            <Typography variant="h5">{store.beerInfoStore.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "13%",
              bgcolor: "#EBB93E",
              borderRadius: "10px",
              pl: 1,
              my: 1,
            }}
          >
            <FactoryIcon sx={{ fontSize: "250%", mr: 2 }} />
            <Typography variant="h5">{store.beerInfoStore.producer}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "13%",
              bgcolor: "#EBB93E",
              borderRadius: "10px",
              pl: 1,
              my: 1,
            }}
          >
            <SportsBarIcon sx={{ fontSize: "250%", mr: 2 }} />
            <Typography
              variant="h5"
              sx={{
                overflow: "hidden", // Hides the overflowing text
                textOverflow: "ellipsis", // Adds ellipsis (...) when the text overflows
                whiteSpace: "nowrap", // Prevents text from wrapping to the next line
                width: "calc(100% - 50px)", // Adjust width to leave space for the icon
              }}
            >
              {store.beerInfoStore.kind}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "13%",
              bgcolor: "#EBB93E",
              borderRadius: "10px",
              pl: 1,
              my: 1,
            }}
          >
            <PublicIcon sx={{ fontSize: "250%", mr: 2 }} />
            <Typography variant="h5">
              {store.beerInfoStore.originCountry}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "13%",
              bgcolor: "#EBB93E",
              borderRadius: "10px",
              pl: 1,
              my: 1,
            }}
          >
            <PercentIcon sx={{ fontSize: "250%", mr: 2 }} />
            <Typography variant="h5">
              {store.beerInfoStore.alcoholAmount}%
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "13%",
              bgcolor: "#EBB93E",
              borderRadius: "10px",
              pl: 1,
              my: 1,
            }}
          >
            <SpaIcon sx={{ fontSize: "250%", mr: 2 }} />
            <Typography variant="h5">IBU {store.beerInfoStore.ibu}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
});

export default BeerInfo;
