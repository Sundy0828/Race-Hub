"use client";

import { useRaceWithResults } from "@/graphql/hooks/useGetRaceWithResults";
import { Box, Typography, Card, CardContent } from "@mui/material";
import ResultsTable from "./ResultsTable";
import EmptyCard from "@/components/emptyCard/EmptyCard";
import sharedStyles from "@/styles/shared.module.scss";

type Props = {
  raceId: string;
  yearId: string;
  resultId: string;
};

export default function RacePageClient({ raceId, yearId, resultId }: Props) {
  const { race, raceLoading, raceError } = useRaceWithResults(Number(raceId));

  if (raceLoading) return <p>Loading race...</p>;
  if (raceError) return <p>Error loading race</p>;

  return (
    <div className={sharedStyles.maxSize}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">All Races</Typography>
      </Box>
      {race && race.results.length > 0 ? (
        <ResultsTable results={race.results} />
      ) : (
        <EmptyCard title="No results have been added yet." />
      )}
    </div>
  );
}
