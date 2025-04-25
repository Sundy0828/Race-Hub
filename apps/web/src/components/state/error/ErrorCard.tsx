"use client";

import { Card, CardContent, Typography, Button, useTheme } from "@mui/material";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorCard({
  message = "Something went wrong.",
  onRetry,
}: Props) {
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
        <Typography variant="h6">{message}</Typography>
        {onRetry && (
          <Button variant="contained" color="primary" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
