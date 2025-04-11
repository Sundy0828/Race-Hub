import { NetworkStatus, OperationVariables, useQuery } from "@apollo/client";
import { GetRaceWithResultsDocument, Race } from "../generated/graphqlTypes";

export type RaceResponse = {
  race: Race | undefined;
  raceError: Error | undefined;
  raceLoading: boolean;
  raceRefetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<any>;
  raceNetworkStatus: NetworkStatus;
};

/**
 * @description Fetching a single race by its ID with results.
 */
export const useRaceWithResults = (raceId: number): RaceResponse => {
  const { data, error, loading, refetch, networkStatus } = useQuery(
    GetRaceWithResultsDocument,
    {
      variables: { raceId },
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    race: data?.race,
    raceError: error,
    raceLoading: loading,
    raceRefetch: refetch,
    raceNetworkStatus: networkStatus,
  };
};
