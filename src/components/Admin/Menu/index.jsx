import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import Add from "@mui/icons-material/Add";
import MovieIcon from "@mui/icons-material/Movie";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import { t } from "i18next";

function AdminMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [movieOpen, setMovieOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (navigateTo) => {
    navigate(navigateTo);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          top: "15px",
          left: "10px",
          zIndex: 99999999,
          color: "white",
        }}
      >
        <MenuIcon />
      </Button>
      <Drawer
        sx={{
          zIndex: 99999999,
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 300 }} role="presentation">
          <List>
            <ListItem
              sx={{ pl: 2, gap: 1, display: "flex", alignItems: "center" }}
              disablePadding
            >
              <Avatar sx={{ width: 56, height: 56 }}>
                {user.firstname.slice(0, 1)}
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                <ListItemText primary={user.firstname} />
                <ListItemText primary={user.lastname} />
              </Box>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={() => handleClick("/admin")}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={t("AdminMenuMainTitle")} />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={() => setMovieOpen(!movieOpen)}>
              <ListItemButton>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary={t("movieText")} />
                {movieOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={movieOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => handleClick("/admin/add-movie")}
                  sx={{ pl: 6 }}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary={t("AdminAddMovieText")} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleClick("/admin/edit-movie")}
                  sx={{ pl: 6 }}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary={t("AdminEditMovieText")} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleClick("/admin/delete-movie")}
                  sx={{ pl: 6 }}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("AdminDeleteMovieText")} />
                </ListItemButton>
                <ListItemButton
                  disabled={user.email !== "usmonw@icloud.com"}
                  sx={{ pl: 6 }}
                  onClick={() => handleClick("/admin/delete-all-movies")}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("DeleteAllMovies")} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem onClick={() => setUsersOpen(!usersOpen)}>
              <ListItemButton>
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText primary={t("users")} />
                {usersOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={usersOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => handleClick("/admin/users")}
                  sx={{ pl: 6 }}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("allUsers")} />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  onClick={() => handleClick("/admin/giveorcancel")}
                >
                  <ListItemIcon>
                    <ChangeCircleRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("giveorcancel")} />
                </ListItemButton>
                <ListItemButton
                  disabled={user.email !== "usmonw@icloud.com"}
                  sx={{ pl: 6 }}
                  onClick={() => handleClick("/admin/delete-all-users")}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("DeleteAllUsers")} />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default AdminMenu;
