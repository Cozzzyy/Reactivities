import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";
import type {TextFieldProps} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";

type Props<T extends FieldValues> = UseControllerProps<T> & Omit<TextFieldProps, 'value' | 'onChange' | 'onError' | 'name'> & {
    defaultValue?: Date | null | undefined;
};

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});

    return (
        <DateTimePicker
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date ? new Date(date) : null)}
            sx={{width: '100%'}}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                    variant: "outlined",
                    ...props,
                },
            }}
        />
    );
}