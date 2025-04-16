import { useMutation } from "@apollo/client";
import {
  CreateResultDocument,
  CreateResultMutation,
  CreateResultMutationVariables,
  Result,
} from "../generated/graphqlTypes";

export type CreateResultResponse = {
  createResult: Result | undefined;
  createResultError: Error | undefined;
  createResultLoading: boolean;
  createResultMutation: (
    raceId: number,
    participant: string,
    time: number,
    onCompleted?: (data: CreateResultMutation) => void,
    onError?: (error: Error) => void
  ) => void;
};

/**
 * @description Createing a result to a race.
 */
export const useCreateResult = (): CreateResultResponse => {
  const [createResultMutation, { loading, error, data }] = useMutation<
    CreateResultMutation,
    CreateResultMutationVariables
  >(CreateResultDocument);

  const createResult = (
    raceId: number,
    participant: string,
    time: number,
    onCompleted?: (data: CreateResultMutation) => void,
    onError?: (error: Error) => void
  ): void => {
    createResultMutation({
      variables: { input: { raceId, participant, time } },
      onCompleted,
      onError,
    });
  };

  return {
    createResult: data?.createResult as Result | undefined,
    createResultError: error,
    createResultLoading: loading,
    createResultMutation: createResult,
  };
};
