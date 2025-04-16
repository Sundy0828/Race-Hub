import { useMutation } from "@apollo/client";
import {
  UpdateResultDocument,
  Result,
  UpdateResultInput,
} from "../generated/graphqlTypes";

export const useUpdateResult = () => {
  const [updateResult, { data, loading, error }] =
    useMutation(UpdateResultDocument);
  return {
    updateResult: (id: number, input: UpdateResultInput) =>
      updateResult({ variables: { id, input } }),
    updatedResult: data?.updateResult as Result | undefined,
    updateResultLoading: loading,
    updateResultError: error,
  };
};
