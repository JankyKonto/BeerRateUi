import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { NavLink } from "react-router-dom";

const MyAppBar = () => {
  //const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Distribute space between left and right
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SportsBarIcon sx={{ mr: "5px" }} />
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Beer Rate
          </Typography>
          <Button
            component={NavLink}
            to="/link1"
            key="Link1"
            sx={{ color: "#fff" }}
          >
            Link 1
          </Button>
          <Button
            component={NavLink}
            to="/link2"
            key="Link2"
            sx={{ color: "#fff" }}
          >
            Link 2
          </Button>
        </Box>

        <Box>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{
              mr: 15,
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box>
          <Button component={NavLink} to="/login" sx={{ color: "#fff" }}>
            Zaloguj się
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
