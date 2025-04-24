"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import LocationAutocomplete from "@/components/input/location/LocationAutoComplete";
import { MutationStatus } from "@/hooks/useStatusFromMutation";
import StatusButton from "@/components/button/statusButton/StatusButton";

export type NewRaceData = {
  name: string;
  location: string;
  date: number;
};

type RaceDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: NewRaceData) => void;
  status: MutationStatus;
  race?: NewRaceData;
};

export default function RaceDialog({
  open,
  onClose,
  onSave,
  status,
  race,
}: RaceDialogProps) {
  const getLocalDateStr = (ms: number) => {
    return new Date(ms).toLocaleDateString("sv-SE"); // "YYYY-MM-DD"
  };

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isLocationValid, setIsLocationValid] = useState(!!race);

  useEffect(() => {
    if (open) {
      const now = new Date();
      setName(race?.name || "");
      setLocation(race?.location || "");
      setDate(getLocalDateStr(race ? Number(race.date) : now.getTime()));
      setIsLocationValid(!!race);
    }
  }, [race, open]);

  const handleSave = () => {
    if (name && date && isLocationValid) {
      const time = Number(date);
      onSave({ name, date: time, location });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{race ? "Edit Race" : "Add Race"}</DialogTitle>
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
