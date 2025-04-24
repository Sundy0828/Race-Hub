"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";

type Props = {
  title: string;
  onClick?: () => void;
  buttonText?: string;
};

export default function EmptyCard({ title, onClick, buttonText }: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "none",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          padding: 3,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {onClick && buttonText && (
          <Box mt={2}>
            <Button variant="contained" onClick={onClick}>
              {buttonText}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
