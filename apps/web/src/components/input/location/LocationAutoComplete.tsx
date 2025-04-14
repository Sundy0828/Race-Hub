"use client";

import {
  Autocomplete,
  CircularProgress,
  debounce,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onValidate?: (valid: boolean) => void;
};

type LocationOption = {
  label: string;
};

export default function LocationAutocomplete({
  value,
  onChange,
  onValidate,
}: Props) {
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  // Inside component state
  const [isValid, setIsValid] = useState(true);

  // Fetch suggestions from OpenCage
  const fetchSuggestions = useMemo(
    () =>
      debounce(async (input: string) => {
        if (!input) return;

        setLoading(true);
        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              input
            )}&key=${process.env.NEXT_PUBLIC_OPENCAGE_KEY}&limit=5`
          );
          const data = await res.json();

          const suggestions = data.results.map((result: any) => ({
            label: result.formatted,
          }));
          setOptions(suggestions);
        } catch (err) {
          console.error("Failed to fetch location suggestions:", err);
        } finally {
          setLoading(false);
        }
      }, 400),
    []
  );

  // Validate full location
  const validateLocation = async (input: string) => {
    if (!onValidate) return;
    if (!input) {
      setIsValid(false);
      onValidate(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          input
        )}&key=${process.env.NEXT_PUBLIC_OPENCAGE_KEY}&limit=1`
      );
      const data = await res.json();
      const valid = data.results && data.results.length > 0;
      setIsValid(valid);
      onValidate(valid);
    } catch (err) {
      console.error("Location validation failed:", err);
      setIsValid(false);
      onValidate(false);
    }
  };

  useEffect(() => {
    fetchSuggestions(value);
    validateLocation(value);
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      freeSolo
      options={options}
      inputValue={value}
      onInputChange={(event, newValue) => {
        onChange(newValue);
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          error={!isValid}
          helperText={
            !isValid ? "Invalid location. Please select a valid place." : ""
          }
          margin="dense"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
