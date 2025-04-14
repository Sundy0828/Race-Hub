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

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, date: string, location: string) => void;
};

export default function AddRaceDialog({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("Spring Classic");
  const [date, setDate] = useState("2025-04-27");
  const [location, setLocation] = useState("");
  const [isLocationValid, setIsLocationValid] = useState(false);

  const handleSave = () => {
    if (name && date && isLocationValid) {
      onSave(name, date, location);
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
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!name || !date || !isLocationValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
