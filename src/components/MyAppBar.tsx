import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../store/Store";
import MenuIcon from "@mui/icons-material/Menu";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface AppBarLink {
  title: string;
  path: string;
}

const MyAppBar = observer(() => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null
  );

  const links: AppBarLink[] = [{ title: "Dodaj piwo", path: "add-beer" }];

  const navigateTo = useNavigate();

  const handleLogout = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const result = await store.authStore.logout();
    if (result) {
      navigateTo("/");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Distribute space between left and right
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            width: "30%",
          }}
        >
          <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Button
          component={NavLink}
          to="/"
          sx={{
            color: "inherit",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <SportsBarIcon sx={{ mr: "5px" }} />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              color: "inherit",
              textWrap: "nowrap",
              textTransform: "none",
            }}
          >
            Beer Rate
          </Typography>
        </Button>
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            alignItems: "center",
            textWrap: "nowrap",
          }}
        >
          {store.authStore.isLoggedIn && (
            <Button component={NavLink} to={"/add-beer"} sx={{ color: "#fff" }}>
              Dodaj Piwo
            </Button>
          )}
          {store.authStore.isAdmin && (
            <Button
              component={NavLink}
              to={"/beer-confirmation"}
              sx={{ color: "#fff" }}
            >
              Potwierdź piwa
            </Button>
          )}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "none", md: "flex" },
            justifyContent: "center",
            mr: 5,
          }}
        ></Box>
        <Box sx={{ display: "flex", justifyContent: "end", width: "30%" }}>
          {store.authStore.isLoggedIn ? (
            <Box>
              <Tooltip title="Opcje">
                <IconButton
                  onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                open={!!userMenuAnchor}
                anchorEl={userMenuAnchor}
                onClose={() => setUserMenuAnchor(null)}
              >
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>
                    Wyloguj się
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button component={NavLink} to="/login" sx={{ color: "#fff" }}>
              Zaloguj się
            </Button>
          )}
        </Box>
      </Toolbar>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List>
          {store.authStore.isLoggedIn && (
            <ListItemButton component={NavLink} to="/add-beer" sx={{ px: 8 }}>
              <ListItemText primary="Dodaj Piwo" />
            </ListItemButton>
          )}
          {store.authStore.isAdmin && (
            <ListItemButton
              component={NavLink}
              to="/beer-confirmation"
              sx={{ px: 8 }}
            >
              <ListItemText primary="Potwierdź Piwo" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
});

export default MyAppBar;
