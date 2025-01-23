import {
  Avatar,
  Box,
  FormControl,
  FormLabel,
  Paper,
  Popover,
  Rating,
  Typography,
} from "@mui/material";
import { store } from "../../store/Store";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FactoryIcon from "@mui/icons-material/Factory";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import PublicIcon from "@mui/icons-material/Public";
import PercentIcon from "@mui/icons-material/Percent";
import SpaIcon from "@mui/icons-material/Spa";
import { observer } from "mobx-react-lite";
import { api } from "../../service/api";
import { useEffect, useRef, useState } from "react";

const BeerInfo = observer(() => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLDivElement | null>(
    null
  );
  const ratingRef = useRef<HTMLDivElement | null>(null);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
    if (ratingRef.current) {
      setPopoverAnchor(ratingRef.current);
    }
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
    setPopoverAnchor(null);
  };

  /*
  useEffect(() => {
    // This ensures that the Popover opens only after the DOM element is available
    if (ratingRef.current) {
      setPopoverAnchor(ratingRef.current);
    }
  }, []);
  */

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderRadius: "10px",
        width: { xs: "94vw", sm: "94vw", md: "47vw" },
        height: "65vh",
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
              src={api.getBeerImageUrl(store.beerInfoStore.id)}
            />
          </Box>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handlePopoverOpen()}
          >
            <Rating
              precision={0.01}
              sx={{ mt: 2 }}
              value={store.beerInfoStore.avgRate}
              readOnly
              ref={ratingRef}
            />
          </div>
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
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "calc(100% - 50px)",
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
      <Popover
        open={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        sx={{ top: "30px" }}
      >
        <Box>
          <FormControl>
            <FormLabel>Smak</FormLabel>
            <Rating
              precision={0.01}
              sx={{ mt: 2 }}
              value={store.beerInfoStore.avgTasteRate}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Zapach</FormLabel>
            <Rating
              precision={0.01}
              sx={{ mt: 2 }}
              value={store.beerInfoStore.avgAromaRate}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Piana</FormLabel>
            <Rating
              precision={0.01}
              sx={{ mt: 2 }}
              value={store.beerInfoStore.avgFoamRate}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Barwa</FormLabel>
            <Rating
              precision={0.01}
              sx={{ mt: 2 }}
              value={store.beerInfoStore.avgColorRate}
              readOnly
            />
          </FormControl>
        </Box>
      </Popover>
    </Paper>
  );
});

export default BeerInfo;
