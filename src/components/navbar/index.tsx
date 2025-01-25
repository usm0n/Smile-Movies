"use client";

import { Logout, Search, WarningRounded } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/logo.png";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Dropdown,
  IconButton,
  List,
  ListItemButton,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { isLoggedIn, redirect } from "../../utilities/defaults";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [logoutModal, setLogoutModal] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="navbar">
      <Box display={"flex"} gap={1}>
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            color: "white",
            display: "none",
            "@media (max-width: 700px)": {
              display: "flex",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <img src={logo} width={100} alt="" />
      </Box>
      <Box
        sx={{
          "@media (max-width: 700px)": {
            display: "none",
          },
        }}
        display={"flex"}
        gap={1}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Box>
      <Autocomplete
        sx={{
          width: "400px",

          "@media (max-width: 1000px)": {
            display: searchVisibility ? "flex" : "none",
            position: "absolute",
            top: "90px",
            left: "10px",
            right: "10px",
            width: "auto",
          },
        }}
        options={[]}
        placeholder="Search"
      />
      <Box display={"flex"} gap={1}>
        <IconButton
          onClick={() => setSearchVisibility(!searchVisibility)}
          sx={{
            color: "gray",
            ":hover": {
              backgroundColor: "transparent",
              color: "white",
            },
            "@media (min-width: 1000px)": {
              display: "none",
            },
          }}
        >
          <Search />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            "@media (max-width: 700px)": {
              display: "none",
            },
          }}
        >
          {!isLoggedIn ? (
            <Button color="neutral">Sign In</Button>
          ) : (
            <Dropdown>
              <MenuButton
                sx={{
                  border: "none",
                  transition: "200ms",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                  ":active": {
                    scale: 1.1,
                  },
                }}
              >
                <Avatar>UR</Avatar>
              </MenuButton>
              <Menu>
                <MenuItem>
                  <Avatar>UR</Avatar>
                  <Tooltip title="View Profile">
                    <Stack>
                      <Typography>Usmon Umarovich</Typography>
                      <Typography level="body-xs">usmonw@icloud.com</Typography>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <IconButton
                      onClick={() => setLogoutModal(true)}
                      color="danger"
                    >
                      <Logout />
                    </IconButton>
                  </Tooltip>
                </MenuItem>
              </Menu>
            </Dropdown>
          )}
        </Box>
      </Box>
      <Modal open={logoutModal} onClose={() => setLogoutModal(false)}>
        <ModalDialog minWidth={500} variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRounded />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>Are you sure you want to log out?</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => setLogoutModal(false)}
            >
              Log out
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setLogoutModal(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <ModalClose />
        <Box padding={2} paddingTop={7}>
          <List>
            {isLoggedIn? 
            <ListItemButton
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Avatar>UR</Avatar>
              <Tooltip title="View Profile">
                <Stack>
                  <Typography>Usmon Umarovich</Typography>
                  <Typography level="body-xs">usmonw@icloud.com</Typography>
                </Stack>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={() => setLogoutModal(true)} color="danger">
                  <Logout />
                </IconButton>
              </Tooltip>
            </ListItemButton> : <Button>Sign in</Button>}
          </List>
          <br />
          <Divider />
          <List
            size="lg"
            component="nav"
            sx={{
              flex: "none",
              fontSize: "xl",
              "& > div": { justifyContent: "center" },
            }}
          >
            <ListItemButton
              onClick={() => redirect("/")}
              sx={{ fontWeight: "lg" }}
            >
              Home
            </ListItemButton>
            <ListItemButton onClick={() => redirect("/about")}>
              About
            </ListItemButton>
            <ListItemButton onClick={() => redirect("/contact")}>
              Contact
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default Navbar;
