import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";
import { store } from "../../store/Store";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FactoryIcon from "@mui/icons-material/Factory";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { api } from "../../service/api";
import { BEER_KINDS } from "../../utils/data";
import { Beer } from "../../model";
import { observer } from "mobx-react-lite";

interface Props {
  beers: Beer[];
  isConfirmation?: boolean;
  page: number;
  changePage:
    | ((event: React.ChangeEvent<unknown>, page: number) => void)
    | undefined;
  pagesAmount: number;
}

const BeerList: React.FC<Props> = observer(
  ({ beers, isConfirmation, page, changePage, pagesAmount }) => {
    const navigateTo = useNavigate();

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: isConfirmation ? "100%" : "80%",
          p: 2,
        }}
      >
        {beers.map((beer, index) => (
          <Card
            key={index}
            className="MuiButtonBase-root"
            sx={{
              width: "18%",
              minWidth: "220px",
              height: "500px",
              m: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardActionArea
              onClick={() => navigateTo(`/beer/${beer.id}`)}
              sx={{ flex: 1, bgcolor: "#F1F1F1" }}
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
                  style={{ width: "20px" }}
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
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  <DriveFileRenameOutlineIcon
                    sx={{ mr: 1, verticalAlign: "middle" }}
                  />
                  {beer.name}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  <FactoryIcon sx={{ mr: 1, verticalAlign: "top" }} />
                  <span>{beer.producer}</span>
                </Typography>
                <Typography
                  gutterBottom
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  <SportsBarIcon sx={{ mr: 1, verticalAlign: "top" }} />
                  {BEER_KINDS.find((k) => k.id === beer.kind)?.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            {isConfirmation && (
              <CardActions
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ width: "50%" }}
                  onClick={() =>
                    store.beerConfirmationPageStore.confirm(beer.id)
                  }
                >
                  Potwierdź
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ width: "50%" }}
                  onClick={() =>
                    store.beerConfirmationPageStore.reject(beer.id)
                  }
                >
                  Odrzuć
                </Button>
              </CardActions>
            )}
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
          {/* 
        <Pagination
          page={store.beerListPageStore.page}
          onChange={(_, value) => (store.beerListPageStore.page = value)}
          count={store.beerListPageStore.pagesAmount}
        />
        */}

          <Pagination page={page} onChange={changePage} count={pagesAmount} />
        </Box>
      </Box>
    );
  }
);

export default BeerList;
