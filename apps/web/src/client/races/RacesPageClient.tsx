"use client";

import { useRaces } from "@/graphql/hooks/GetRaces";

type Props = {
  yearId: number;
};

export default function RacesPageClient({ yearId }: Props) {
  const { races, racesLoading, racesError } = useRaces();

  if (racesLoading) return <p>Loading...</p>;
  if (racesError) return <p>Error loading races</p>;

  return (
    <div>
      <h1>All Races</h1>
      <ul>{races?.map((race) => <li key={race.id}>{race.name}</li>)}</ul>
    </div>
  );
}
