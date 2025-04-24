"use client";

import { useRaceWithResults } from "@/graphql/hooks/useGetRaceWithResults";
import { Box, Typography } from "@mui/material";
import ResultsTable from "./ResultsTable";
import EmptyCard from "@/components/state/empty/EmptyCard";
import sharedStyles from "@/styles/shared.module.scss";
import ErrorCard from "@/components/state/error/ErrorCard";
import LoadingSpinner from "@/components/state/loading/LoadingSpinner";

type Props = {
  raceId: string;
  yearId: string;
  resultId: string;
};

export default function ResultsPageClient({ raceId, yearId, resultId }: Props) {
  const { race, raceLoading, raceError, raceRefetch } = useRaceWithResults(
    Number(raceId)
  );

  if (raceLoading) return <LoadingSpinner />;
  if (raceError) return <ErrorCard onRetry={() => raceRefetch()} />;

  return (
    <div className={sharedStyles.maxSize}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">{race?.name}</Typography>
      </Box>
      {race && race.results.length > 0 ? (
        <ResultsTable results={race.results} />
      ) : (
        <EmptyCard title="No results have been added yet." />
      )}
    </div>
  );
}
