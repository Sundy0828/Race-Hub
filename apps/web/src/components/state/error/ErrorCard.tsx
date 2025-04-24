"use client";

import { Box, Card, CardContent, Typography, Button } from "@mui/material";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorCard({
  message = "Something went wrong.",
  onRetry,
}: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
      <Card sx={{ textAlign: "center", p: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
          {onRetry && (
            <Button variant="contained" color="primary" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
