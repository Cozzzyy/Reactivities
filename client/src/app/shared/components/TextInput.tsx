import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";
import {TextField, type TextFieldProps} from "@mui/material";


type Props<T extends FieldValues> = {
} & UseControllerProps<T> & TextFieldProps;

export default function TextInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});


    return (
        <TextField
            {...field}
            {...props}
            value={field.value || ''}
            label={props.label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            variant="outlined"
            />
    );
}