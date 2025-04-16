"use client";

import { useState } from "react";
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
} from "@mui/material";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import { useCreateRace } from "@/graphql/hooks/CreateRace";
import AddIcon from "@mui/icons-material/Add";
import AddRaceDialog, {
  NewRaceData,
} from "@/components/dialog/addRace/AddRaceDialog";
import { useStatusFromMutation } from "@/hooks/useStatusFromMutation";
import { useSnackbar } from "@/providers/snackbar/SnackbarContext";

export default function RacesPageClient({ yearId }: { yearId: number }) {
  const { user } = useFirebaseAuth();
  const { showSnackbar } = useSnackbar();
  const { races, racesLoading, racesError, racesRefetch } = useRaces();
  const { createRaceMutation, createRaceLoading, createRaceError } =
    useCreateRace();

  const [openDialog, setOpenDialog] = useState(false);

  const status = useStatusFromMutation({
    isLoading: createRaceLoading,
    isError: !!createRaceError,
  });

  const handleCreate = (race: NewRaceData) => {
    createRaceMutation(race.name, race.date, race.location, () => {
      setOpenDialog(false);
      showSnackbar({
        message: "Race created successfully",
        severity: "success",
      });
      racesRefetch();
    });
  };

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

      <AddRaceDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleCreate}
        status={status}
      />

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
