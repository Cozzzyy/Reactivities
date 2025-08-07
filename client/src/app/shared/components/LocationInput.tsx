import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import type {LocationIQSuggestion} from "../../../lib/types";
import Box from "@mui/material/Box";
import {debounce, List, ListItemButton, TextField, Typography} from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
    label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
        if (field.value && field.value === 'object') {
            setInputValue(field.value);
        }
    }, [field.value]);

    const locationIQUrl = 'https://api.locationiq.com/v1/autocomplete?key=pk.368a7af38cd8565097e2825cba72f6d1&q=burgemeester%20jozef%20van%20aperenstraat&limit=5&dedupe=1&';

    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get<LocationIQSuggestion[]>(`${locationIQUrl}q=${query}`);
                const data: LocationIQSuggestion[] = response.data;
                setSuggestions(data);
            }
            catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }

        }, 500), [locationIQUrl]
    )


    const handleInputChange = async (value: string) => {
        setInputValue(value); // Add this line to update the input display
        field.onChange(value);
        await fetchSuggestions(value);
    }

    const handleSelection = (suggestion: LocationIQSuggestion) => {
        const city = suggestion.address.city || suggestion.address.town || suggestion.address.village;
        const venue = suggestion.display_name;
        const latitude = suggestion.lat;
        const longitude = suggestion.lon;

        setInputValue(venue);
        field.onChange({
            venue,
            city,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        });
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={(e) => {
                    handleInputChange(e.target.value);
                }}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}


            >

            </TextField>
            {loading && <Typography>Loading suggestions...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ccc', borderRadius: 1 }}>
                    {suggestions.map((suggestion) => (
                        <ListItemButton divider key={suggestion.place_id} onClick={() => {
                            handleSelection(suggestion)
                        }} sx={{cursor: 'pointer', padding: 1, borderBottom: '1px solid #ccc'}}>
                            <Typography>{suggestion.display_name}</Typography>
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );
}