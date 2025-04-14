// src/components/Footer.tsx
import { Box, Typography } from "@mui/material";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <Box
      component="footer"
      className={styles.footerContainer}
      sx={{ textAlign: "center", py: 2 }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Race Hub. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
