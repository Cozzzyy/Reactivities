import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps} from "@mui/material";

type Props<T extends FieldValues> = {
    items: { text: string; value: string }[];
} & UseControllerProps<T> & Omit<SelectProps, 'name'>;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});
    const {items, label, ...selectProps} = props;

    return (
        <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
            <InputLabel>{label}</InputLabel>
            <Select
                {...field}
                {...selectProps}
                label={label}
                onChange={field.onChange}
            >
                {items.map((option) => (
                    <MenuItem key={option.text} value={option.value}>
                        {option.text}
                    </MenuItem>
                ))}
            </Select>
            {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
        </FormControl>
    );
}