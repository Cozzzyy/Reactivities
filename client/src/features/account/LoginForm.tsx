import {Box, Button, TextField, Typography, Paper} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAccount} from "../../lib/hooks/useAccount.ts";
import type {LoginSchema} from "../../lib/schemas/loginSchema.ts";
import {loginSchema} from "../../lib/schemas/loginSchema.ts";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";

export default function LoginForm() {
    const {loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            }
        });
    };

    return (
        <Paper elevation={3} sx={{p: 4, maxWidth: 400, mx: 'auto', mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Login
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
                    disabled={!isValid || isSubmitting}
                    sx={{mt: 3, mb: 2}}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <Typography variant="body2" align="center">
                    Don't have an account? <Button color="primary" onClick={() => navigate('/register')}>Register</Button>
                </Typography>
            </Box>
        </Paper>
    );
}