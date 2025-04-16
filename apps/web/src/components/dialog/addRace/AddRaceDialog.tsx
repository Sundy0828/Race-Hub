"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import LocationAutocomplete from "@/components/input/location/LocationAutoComplete";
import { MutationStatus } from "@/hooks/useStatusFromMutation";
import StatusButton from "@/components/button/statusButton/StatusButton";

export type NewRaceData = {
  name: string;
  date: string;
  location: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (race: NewRaceData) => void;
  status?: MutationStatus;
};

export default function AddRaceDialog({
  open,
  onClose,
  onSave,
  status,
}: Props) {
  const now = new Date();
  const localDateStr = now.toLocaleDateString("sv-SE");

  const [name, setName] = useState("");
  const [date, setDate] = useState(localDateStr);
  const [location, setLocation] = useState("");
  const [isLocationValid, setIsLocationValid] = useState(false);

  const handleSave = () => {
    if (name && date && isLocationValid) {
      onSave({ name, date, location });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Race</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Race Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          type="date"
          label="Race Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <LocationAutocomplete
          value={location}
          onChange={(val) => setLocation(val)}
          onValidate={(isValid) => setIsLocationValid(isValid)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <StatusButton
          onClick={handleSave}
          disabled={!name || !date || !location || !isLocationValid}
          status={status}
        >
          Save
        </StatusButton>
      </DialogActions>
    </Dialog>
  );
}
