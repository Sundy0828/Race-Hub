"use client";

import { useState } from "react";
import { useRaces } from "@/graphql/hooks/useGetRaces";
import RacesTable from "./RacesTable";
import LoadingSpinner from "@/components/state/loading/LoadingSpinner";
import ErrorCard from "@/components/state/error/ErrorCard";
import { Box, Typography, Button } from "@mui/material";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import { useCreateRace } from "@/graphql/hooks/useCreateRace";
import AddIcon from "@mui/icons-material/Add";
import RaceDialog, { NewRaceData } from "@/components/dialog/race/RaceDialog";
import { useStatusFromMutation } from "@/hooks/useStatusFromMutation";
import { useSnackbar } from "@/providers/snackbar/SnackbarContext";
import { useDeleteRace } from "@/graphql/hooks/useDeleteRace";
import { useUpdateRace } from "@/graphql/hooks/useUpdateRace";
import { Race } from "@/graphql/generated/graphqlTypes";
import ConfirmDialog from "@/components/dialog/confirm/ConfirmDialog";
import EmptyCard from "@/components/state/empty/EmptyCard";
import sharedStyles from "@/styles/shared.module.scss";

export default function RacesPageClient({ yearId }: { yearId: number }) {
  const { user } = useFirebaseAuth();
  const { showSnackbar } = useSnackbar();
  const { races, racesLoading, racesError, racesRefetch } = useRaces();

  const [openDialog, setOpenDialog] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [editingRace, setEditingRace] = useState<Race | null>(null);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const { createRaceMutation, createRaceLoading, createRaceError } =
    useCreateRace();
  const { updateRace, updateRaceLoading, updateRaceError } = useUpdateRace();
  const { deleteRace, deleteRaceLoading, deleteRaceError } = useDeleteRace();

  const createUpdateStatus = useStatusFromMutation({
    isLoading: createRaceLoading || updateRaceLoading,
    isError: !!createRaceError || !!updateRaceError,
  });

  const deleteStatus = useStatusFromMutation({
    isLoading: deleteRaceLoading,
    isError: !!deleteRaceError,
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

  const handleUpdate = (race: NewRaceData) => {
    if (!editingRace) return;

    updateRace(editingRace.id, {
      name: race.name,
      date: race.date,
      location: race.location,
    }).then(() => {
      setEditingRace(null);
      setOpenDialog(false);
      showSnackbar({
        message: "Race updated successfully",
        severity: "success",
      });
      racesRefetch();
    });
  };

  const handleDeleteRace = (race: Race) => {
    setSelectedRace(race);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedRace) {
      deleteRace(selectedRace.id).then(() => {
        showSnackbar({ message: "Race deleted", severity: "success" });
        racesRefetch();
      });
    }
    setShowConfirm(false);
  };

  if (racesLoading) return <LoadingSpinner />;
  if (racesError) return <ErrorCard onRetry={() => racesRefetch()} />;

  return (
    <div className={sharedStyles.maxSize}>
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

      <RaceDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingRace(null);
        }}
        onSave={editingRace ? handleUpdate : handleCreate}
        status={createUpdateStatus}
        race={editingRace || undefined}
      />

      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Race?"
        message="Are you sure you want to delete this race? This action cannot be undone."
        confirmText="Delete"
        status={deleteStatus}
      />

      {races && races.length > 0 ? (
        <RacesTable
          races={races}
          onEdit={(race) => {
            setEditingRace(race);
            setOpenDialog(true);
          }}
          onDelete={handleDeleteRace}
        />
      ) : (
        <EmptyCard
          title="No races have been created yet."
          onClick={() => setOpenDialog(true)}
          buttonText="Add Race"
        />
      )}
    </div>
  );
}
