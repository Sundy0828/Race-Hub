import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onValidate?: (isValid: boolean) => void;
};

export default function LocationAutocomplete({
  value,
  onChange,
  onValidate,
}: Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const didFetchLocation = useRef(false); // 🆕 Tracks whether we already fetched

  const fetchSuggestions = debounce(async (input: string) => {
    if (!input) return;

    setLoading(true);
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        input
      )}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&limit=5&countrycode=us`;

      const res = await fetch(url);
      const data = await res.json();

      const places = data.results
        .map((r: any) => {
          const city =
            r.components.city || r.components.town || r.components.village;
          const state = r.components.state_code || r.components.state;
          return city && state ? `${city}, ${state}` : null;
        })
        .filter(Boolean);

      setOptions(Array.from(new Set(places)));
    } finally {
      setLoading(false);
    }
  }, 300);

  const validateLocation = async (location: string) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      location
    )}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&limit=1&countrycode=us`;

    const res = await fetch(url);
    const data = await res.json();

    const result = data?.results?.[0];
    const isValid = !!(
      result &&
      (result.components.city ||
        result.components.town ||
        result.components.village) &&
      (result.components.state_code || result.components.state)
    );

    onValidate?.(isValid);
  };

  const fetchInitialLocation = async () => {
    if (didFetchLocation.current) return; // 🛑 Already fetched
    didFetchLocation.current = true; // ✅ Prevent re-fetching

    setLoading(true);
    try {
      const coords = await new Promise<GeolocationPosition["coords"]>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            () => reject("Geolocation failed"),
            { timeout: 5000 }
          );
        }
      );

      const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude},${coords.longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&limit=1&countrycode=us`;
      const res = await fetch(url);
      const data = await res.json();

      const result = data.results?.[0]?.components;
      const city = result?.city || result?.town || result?.village;
      const state = result?.state_code || result?.state;

      if (city && state) {
        const locationStr = `${city}, ${state}`;
        onChange(locationStr);
      }
    } catch {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=me&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&limit=1&countrycode=us`;
      const res = await fetch(url);
      const data = await res.json();

      const result = data.results?.[0]?.components;
      const city = result?.city || result?.town || result?.village;
      const state = result?.state_code || result?.state;

      if (city && state) {
        const locationStr = `${city}, ${state}`;
        onChange(locationStr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!value && !didFetchLocation.current) {
      fetchInitialLocation();
    } else if (value) {
      validateLocation(value);
    }
  }, [value]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      value={value}
      onInputChange={(_, newInputValue) => {
        onChange(newInputValue);
        fetchSuggestions(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
