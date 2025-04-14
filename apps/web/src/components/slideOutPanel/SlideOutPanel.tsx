import React from "react";
import {
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./SlideOutPanel.module.scss";

interface SlideOutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const SlideOutPanel: React.FC<SlideOutPanelProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const PanelContent = (
    <>
      <div className={styles.header}>
        <span>{title}</span>
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );

  return (
    <>
      {!isMobile && (
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={onClose}
          variant="temporary"
          classes={{ paper: styles.drawerPaper }}
        >
          <Box className={styles.drawerBox}>{PanelContent}</Box>
        </Drawer>
      )}

      {isMobile && isOpen && (
        <Box className={styles.overlay} onClick={onClose}>
          <Box
            className={styles.mobilePanel}
            onClick={(e) => e.stopPropagation()}
          >
            {PanelContent}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SlideOutPanel;
