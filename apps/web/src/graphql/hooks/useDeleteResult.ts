import { useMutation } from "@apollo/client";
import { DeleteResultDocument } from "../generated/graphqlTypes";

export const useDeleteResult = () => {
  const [deleteResult, { data, loading, error }] =
    useMutation(DeleteResultDocument);
  return {
    deleteResult: (id: number) => deleteResult({ variables: { id } }),
    deletedResultId: data?.deleteResult?.id,
    deleteResultLoading: loading,
    deleteResultError: error,
  };
};
