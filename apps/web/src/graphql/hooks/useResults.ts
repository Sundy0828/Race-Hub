import { useQuery } from "@apollo/client";
import { GetResultsDocument, Result } from "../generated/graphqlTypes";

type ResultsResponse = {
  results: Result[] | undefined;
  resultsLoading: boolean;
  resultsError: Error | undefined;
};

export const useResults = (): ResultsResponse => {
  const { data, loading, error } = useQuery(GetResultsDocument);

  return {
    results: data?.results,
    resultsLoading: loading,
    resultsError: error,
  };
};
