import { useMutation } from "@apollo/client";
import {
  CreateRaceDocument,
  CreateRaceMutation,
  CreateRaceMutationVariables,
  Race,
} from "../generated/graphqlTypes";

export type CreateRaceResponse = {
  createRace: Race | undefined;
  createRaceError: Error | undefined;
  createRaceLoading: boolean;
  createRaceMutation: (
    name: string,
    date: string,
    location: string,
    onCompleted?: (data: CreateRaceMutation) => void,
    onError?: (error: Error) => void
  ) => void;
};

/**
 * @description Creating a new race.
 */
export const useCreateRace = (): CreateRaceResponse => {
  const [createRaceMutation, { loading, error, data }] = useMutation<
    CreateRaceMutation,
    CreateRaceMutationVariables
  >(CreateRaceDocument);

  const createRace = (
    name: string,
    date: string,
    location: string,
    onCompleted?: (data: CreateRaceMutation) => void,
    onError?: (error: Error) => void
  ): void => {
    createRaceMutation({
      variables: { input: { name, date, location } },
      onCompleted,
      onError,
    });
  };

  return {
    createRace: data?.createRace as Race | undefined,
    createRaceError: error,
    createRaceLoading: loading,
    createRaceMutation: createRace,
  };
};
