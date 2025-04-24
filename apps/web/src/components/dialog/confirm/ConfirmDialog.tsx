"use client";

import StatusButton from "@/components/button/statusButton/StatusButton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  status: MutationStatus;
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  status,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={status === "loading"}>
          {cancelText}
        </Button>
        <StatusButton onClick={onConfirm} colorOverride="error" status={status}>
          {confirmText}
        </StatusButton>
      </DialogActions>
    </Dialog>
  );
}
