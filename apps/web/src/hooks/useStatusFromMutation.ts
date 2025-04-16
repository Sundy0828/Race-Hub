import { useEffect, useState } from "react";

export type MutationStatus = "idle" | "loading" | "error" | "success";

export function useStatusFromMutation({
  isLoading,
  isError,
  data,
}: {
  isLoading: boolean;
  isError: boolean;
  data?: unknown;
}) {
  const [status, setStatus] = useState<MutationStatus>("idle");

  useEffect(() => {
    if (isLoading) {
      setStatus("loading");
    } else if (isError) {
      setStatus("error");
    } else if (data) {
      setStatus("success");
    } else {
      setStatus("idle");
    }
  }, [isLoading, isError, data]);

  return status;
}
