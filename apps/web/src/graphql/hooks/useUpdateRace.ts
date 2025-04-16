import { useMutation } from "@apollo/client";
import {
  UpdateRaceDocument,
  Race,
  UpdateRaceInput,
} from "../generated/graphqlTypes";

export const useUpdateRace = () => {
  const [updateRace, { data, loading, error }] =
    useMutation(UpdateRaceDocument);
  return {
    updateRace: (id: number, input: UpdateRaceInput) =>
      updateRace({ variables: { id, input } }),
    updatedRace: data?.updateRace as Race | undefined,
    updateRaceLoading: loading,
    updateRaceError: error,
  };
};
