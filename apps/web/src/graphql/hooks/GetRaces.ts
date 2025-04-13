import { NetworkStatus, OperationVariables, useQuery } from "@apollo/client";
import { GetRacesDocument, Race } from "../generated/graphqlTypes";

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
export const useRaces = (): RacesResponse => {
  const { data, error, loading, refetch, networkStatus } = useQuery(
    GetRacesDocument,
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
