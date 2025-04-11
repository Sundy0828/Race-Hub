import { NetworkStatus, OperationVariables, useQuery } from "@apollo/client";
import { GetRacesWithResultsDocument, Race } from "../generated/graphqlTypes";

export type RacesResponse = {
  races: Race[] | undefined;
  racesError: Error | undefined;
  racesLoading: boolean;
  racesRefetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<any>;
  racesNetworkStatus: NetworkStatus;
};

/**
 * @description Fetching all races with results.
 */
export const useRacesWithResults = (): RacesResponse => {
  const { data, error, loading, refetch, networkStatus } = useQuery(
    GetRacesWithResultsDocument,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    races: data?.races,
    racesError: error,
    racesLoading: loading,
    racesRefetch: refetch,
    racesNetworkStatus: networkStatus,
  };
};
