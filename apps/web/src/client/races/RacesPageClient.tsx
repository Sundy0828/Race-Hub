"use client";

import { useRaces } from "@/graphql/hooks/GetRaces";
import RacesTable from "./RacesTable";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ErrorState from "@/components/error/ErrorState";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import router from "next/router";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";

type Props = {
  yearId: number;
};

export default function RacesPageClient({ yearId }: Props) {
  const { user } = useFirebaseAuth();
  const { races, racesLoading, racesError, racesRefetch } = useRaces();

  if (racesLoading) return <LoadingSpinner />;
  if (racesError) return <ErrorState onRetry={() => racesRefetch()} />;

  if (!races || races.length === 0) {
    return (
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
                onClick={() => router.push("/races/create")}
              >
                Create a Race
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <div>
      <h1>All Races</h1>
      {races && <RacesTable races={races} />}
    </div>
  );
}
