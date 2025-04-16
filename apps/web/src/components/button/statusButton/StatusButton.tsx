import { Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { ReactNode } from "react";
import { MutationStatus } from "@/hooks/useStatusFromMutation";

type Props = {
  status?: MutationStatus;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function StatusButton({
  status = "idle",
  children,
  onClick,
  disabled,
}: Props) {
  const getEndIcon = () => {
    switch (status) {
      case "loading":
        return <CircularProgress size={20} color="inherit" />;
      case "error":
        return <ErrorIcon />;
      case "success":
        return <CheckCircleIcon />;
      default:
        return null;
    }
  };

  const getColor = (): "primary" | "error" | "success" => {
    if (status === "error") return "error";
    if (status === "success") return "success";
    return "primary";
  };

  return (
    <Button
      variant="contained"
      color={getColor()}
      onClick={onClick}
      endIcon={getEndIcon()}
      disabled={status === "loading" || disabled}
    >
      {children}
    </Button>
  );
}
