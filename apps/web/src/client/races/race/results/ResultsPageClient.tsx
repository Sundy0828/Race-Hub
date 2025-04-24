"use client";

import { useRaceWithResults } from "@/graphql/hooks/useGetRaceWithResults";

type Props = {
  raceId: string;
  yearId: string;
  resultId: string;
};

export default function ResultsPageClient({ raceId, yearId, resultId }: Props) {
  const { race, raceLoading, raceError } = useRaceWithResults(Number(raceId));

  if (raceLoading) return <p>Loading race...</p>;
  if (raceError) return <p>Error loading race</p>;

  return (
    <div>
      <h1>{race?.name}</h1>
      <ul>
        {race?.results?.map((result) => <li key={result.id}>{result.time}</li>)}
      </ul>
    </div>
  );
}
