import { useMutation } from "@apollo/client";
import { DeleteRaceDocument } from "../generated/graphqlTypes";

export const useDeleteRace = () => {
  const [deleteRace, { data, loading, error }] =
    useMutation(DeleteRaceDocument);
  return {
    deleteRace: (id: number) => deleteRace({ variables: { id } }),
    deletedRaceId: data?.deleteRace?.id,
    deleteRaceLoading: loading,
    deleteRaceError: error,
  };
};
