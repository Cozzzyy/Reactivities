import { useLocation, Link } from "react-router-dom";
import { Paper, Typography, Button, Box, Alert } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function ServerError() {
    const { state } = useLocation();
    const error = state?.error|| "An unexpected error occurred.";

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    textAlign: "center",
                    maxWidth: 600,
                    width: "100%"
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontSize: "4rem",
                        fontWeight: "bold",
                        color: "error.main",
                        marginBottom: 2
                    }}
                >
                    500
                </Typography>

                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ marginBottom: 2 }}
                >
                    Server Error
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ marginBottom: 3 }}
                >
                    Something went wrong on our end. Please try again later.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 3, textAlign: "left" }}>
                        <Typography variant="body2">
                            <strong>Error details:</strong> {error}
                        </Typography>
                    </Alert>
                )}

                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    size="large"
                    startIcon={<HomeIcon />}
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        paddingX: 3,
                        paddingY: 1.5
                    }}
                >
                    Go to Home
                </Button>
            </Paper>
        </Box>
    );
}