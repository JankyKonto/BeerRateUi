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
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { NavLink } from "react-router-dom";
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

  const links: AppBarLink[] = [
    { title: "Szukaj piwa", path: "beer-list" },
    { title: "Dodaj piwo", path: "add-beer" },
    { title: "Moje oceny", path: "my-grades" },
  ];

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

        <Box
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
            }}
          >
            Beer Rate
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            alignItems: "center",
            textWrap: "nowrap",
          }}
        >
          {links.map((link, index) => (
            <Button
              component={NavLink}
              to={link.path}
              key={index}
              sx={{ color: "#fff" }}
            >
              {link.title}
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "none", md: "flex" },
            justifyContent: "center",
            mr: 5,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{
              resize: "none",
              mr: 15,
              borderRadius: "8px",
              width: 250,
            }}
          />
        </Box>
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
                <MenuItem onClick={() => setUserMenuAnchor(null)}>
                  <Typography sx={{ textAlign: "center" }}>Profil</Typography>
                </MenuItem>
                <MenuItem onClick={() => store.authStore.logout()}>
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
          {links.map((link, index) => (
            <ListItemButton
              key={index}
              component={NavLink}
              to={link.path}
              sx={{ px: 8 }}
            >
              <ListItemText primary={link.title} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
});

export default MyAppBar;