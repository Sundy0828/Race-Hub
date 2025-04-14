"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import SlideOutPanel from "../slideOutPanel/SlideOutPanel";
import UserAvatar from "../avatar/UserAvatar";
import styles from "./NavBar.module.scss";

function NavBar() {
  const router = useRouter();
  const { user, logout } = useFirebaseAuth();
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const isActive = (basePath: string) => {
    if (basePath === "/") return pathname === "/";
    return pathname.startsWith(basePath);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);
  const toggleForm = () => setIsSignUp(!isSignUp);
  const showSignIn = () => {
    setIsOpen(true);
    setIsSignUp(false);
  };
  const showSignUp = () => {
    setIsOpen(true);
    setIsSignUp(true);
  };

  const pages = [
    {
      label: "Races",
      path: "/races",
      onclick: () => {
        handleCloseNavMenu();
        router.push("/races");
      },
    },
    {
      label: "About",
      path: "/about",
      onclick: () => {
        handleCloseNavMenu();
        router.push("/about");
      },
    },
  ];

  const settings = user
    ? [
        {
          label: "Profile",
          onclick: () => {
            handleCloseUserMenu();
            router.push("/profile");
          },
        },
        {
          label: "Logout",
          onclick: () => {
            handleCloseUserMenu();
            logout();
          },
        },
      ]
    : [
        {
          label: "Login",
          onclick: () => {
            handleCloseUserMenu();
            togglePanel();
            showSignIn();
          },
        },
        {
          label: "Register",
          onclick: () => {
            handleCloseUserMenu();
            togglePanel();
            showSignUp();
          },
        },
      ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className={styles.navbarTitle}
          >
            Race Hub
          </Typography>

          <Box className={styles.menuBoxMobile}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className={styles.menuMobile}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={page.onclick}>
                  <Typography className={styles.menuItemText}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            className={styles.navbarTitleMobile}
          >
            Race Hub
          </Typography>

          <Box className={styles.menuBoxDesktop}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={page.onclick}
                color={isActive(page.path) ? "secondary" : "inherit"}
                className={styles.menuItemButton}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                className={styles.avatarButton}
              >
                <UserAvatar
                  profileImgUrl={user?.photoURL ?? ""}
                  displayName={user?.displayName ?? ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              className={styles.userMenu}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.onclick}>
                  <Typography className={styles.menuItemText}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <SlideOutPanel
          title={isSignUp ? "Sign Up" : "Sign In"}
          isOpen={isOpen}
          onClose={togglePanel}
        >
          {isSignUp ? (
            <SignUp onToggleForm={toggleForm} />
          ) : (
            <SignIn onToggleForm={toggleForm} />
          )}
        </SlideOutPanel>
      </Container>
    </AppBar>
  );
}
export default NavBar;
