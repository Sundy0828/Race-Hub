// src/components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./NavBar.module.scss";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import SlideOutPanel from "../slideOutPanel/SlideOutPanel";

const NavBar = () => {
  const { user, logout } = useFirebaseAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);
  const toggleForm = () => setIsSignUp(!isSignUp);
  const showSignIn = () => {
    handleMenuClose();
    setIsOpen(true);
    setIsSignUp(false);
  };
  const showSignUp = () => {
    handleMenuClose();
    setIsOpen(true);
    setIsSignUp(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (basePath: string) => {
    if (basePath === "/") return pathname === "/";
    return pathname.startsWith(basePath);
  };

  const navLinks = [
    { label: "Races", path: "/races" },
    { label: "About", path: "/about" },
  ];

  return (
    <AppBar>
      <Toolbar className={styles.navbarContainer}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color="secondary"
        >
          <Link href="/" className={styles.logo}>
            Race Hub
          </Link>
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              color={isActive(link.path) ? "secondary" : "inherit"}
              component={Link}
              href={link.path}
            >
              {link.label}
            </Button>
          ))}
          {user ? (
            <Button color="inherit" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showSignIn();
                }}
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showSignUp();
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {navLinks.map((link) => (
            <MenuItem
              key={link.path}
              component={Link}
              href={link.path}
              onClick={handleMenuClose}
              selected={isActive(link.path)}
            >
              {link.label}
            </MenuItem>
          ))}
          {user ? (
            <MenuItem
              onClick={() => {
                handleMenuClose();
                logout();
              }}
            >
              Log Out
            </MenuItem>
          ) : (
            <div>
              <MenuItem onClick={showSignIn}>Sign In</MenuItem>
              <MenuItem onClick={showSignIn}>Sign Up</MenuItem>
            </div>
          )}
        </Menu>
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
    </AppBar>
  );
};

export default NavBar;
