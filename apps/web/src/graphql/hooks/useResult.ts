import { useQuery } from "@apollo/client";
import { GetResultDocument, Result } from "../generated/graphqlTypes";

type ResultResponse = {
  result: Result | undefined;
  resultLoading: boolean;
  resultError: Error | undefined;
};

export const useResult = (resultId: number): ResultResponse => {
  const { data, loading, error } = useQuery(GetResultDocument, {
    variables: { resultId },
  });

  return {
    result: data?.result,
    resultLoading: loading,
    resultError: error,
  };
};
