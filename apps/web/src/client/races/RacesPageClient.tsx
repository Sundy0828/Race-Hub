"use client";

import { useEffect, useState } from "react";
import { useRaces } from "@/graphql/hooks/GetRaces";
import RacesTable from "./RacesTable";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ErrorState from "@/components/error/ErrorState";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import { useCreateRace } from "@/graphql/hooks/CreateRace";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  yearId: number;
};

export default function RacesPageClient({ yearId }: Props) {
  const { user } = useFirebaseAuth();
  const { races, racesLoading, racesError, racesRefetch } = useRaces();
  const { createRaceMutation, createRaceLoading } = useCreateRace();

  const [location, setLocation] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch location once
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Failed to fetch IP info");
        const data = await res.json();
        if (data.city && data.region) {
          const loc = `${data.city}, ${data.region}`;
          setLocation(loc);
        }
      } catch (error) {
        console.warn("Could not fetch default location:", error);
        // Set to a fallback string so the dialog still works
        setLocation("Unknown");
      }
    };

    fetchLocation();
  }, []);

  const handleCreate = () => {
    if (!name || !date || !location) return;

    createRaceMutation(
      name,
      date,
      location,
      () => {
        setOpenDialog(false);
        setOpenSnackbar(true);
        racesRefetch();
        setName("");
        setDate("");
      },
      (err) => {
        console.error("Error creating race:", err);
      }
    );
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  if (racesLoading) return <LoadingSpinner />;
  if (racesError) return <ErrorState onRetry={() => racesRefetch()} />;

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">All Races</Typography>
        {user && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Race
          </Button>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          Race <strong>{name}</strong> was created for <strong>{date}</strong>{" "}
          in <strong>{location}</strong>!
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Create a New Race</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Race Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Location"
              fullWidth
              value={location ?? ""}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              helperText="Auto-filled from your IP. You can edit it."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            disabled={createRaceLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!name || !date || !location || createRaceLoading}
          >
            {createRaceLoading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {races && races.length > 0 ? (
        <RacesTable races={races} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                No races have been created yet.
              </Typography>
              {user && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenDialog(true)}
                >
                  Add Race
                </Button>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}
