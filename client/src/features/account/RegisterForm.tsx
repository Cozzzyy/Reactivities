import {useAccount} from "../../lib/hooks/useAccount.ts";
import {registerSchema, type RegisterSchema} from "../../lib/schemas/registerSchema.ts";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {toast} from "react-toastify";


export default function RegisterForm() {
    const {registerUser} = useAccount();
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data,{

            onError: (error) => {
               if (Array.isArray(error)) {
                    error.forEach((err: string) => {
                        toast.error(err);
                    });
                }
               },
        });
    };

    return (
        <Paper elevation={3} sx={{p: 4, maxWidth: 400, mx: 'auto', mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 2}}>
                <Controller
                    name="email"
                    control={control}
                    render={({field, fieldState: {error}}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Email"
                            type="email"
                            error={!!error}
                            helperText={error?.message}
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Controller
                    name="displayName"
                    control={control}
                    render={({field, fieldState: {error}}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Display Name"
                            error={!!error}
                            helperText={error?.message}
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({field, fieldState: {error}}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Password"
                            type="password"
                            error={!!error}
                            helperText={error?.message}
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isValid || isSubmitting}
                    sx={{mt: 2}}
                >
                    Register
                </Button>
            </Box>
        </Paper>
    );
}