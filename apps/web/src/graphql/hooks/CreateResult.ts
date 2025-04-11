import { useMutation } from "@apollo/client";
import {
  AddResultDocument,
  AddResultMutation,
  AddResultMutationVariables,
  Result,
} from "../generated/graphqlTypes";

export type AddResultResponse = {
  addResult: Result | undefined;
  addResultError: Error | undefined;
  addResultLoading: boolean;
  addResultMutation: (
    raceId: number,
    participant: string,
    time: number,
    onCompleted?: (data: AddResultMutation) => void,
    onError?: (error: Error) => void
  ) => void;
};

/**
 * @description Adding a result to a race.
 */
export const useAddResult = (): AddResultResponse => {
  const [addResultMutation, { loading, error, data }] = useMutation<
    AddResultMutation,
    AddResultMutationVariables
  >(AddResultDocument);

  const addResult = (
    raceId: number,
    participant: string,
    time: number,
    onCompleted?: (data: AddResultMutation) => void,
    onError?: (error: Error) => void
  ): void => {
    addResultMutation({
      variables: { raceId, participant, time },
      onCompleted,
      onError,
    });
  };

  return {
    addResult: data?.addResult as Result | undefined,
    addResultError: error,
    addResultLoading: loading,
    addResultMutation: addResult,
  };
};
