import { Paper, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function NotFound() {
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
                    maxWidth: 500,
                    width: "100%"
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontSize: "6rem",
                        fontWeight: "bold",
                        color: "primary.main",
                        marginBottom: 2
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ marginBottom: 2 }}
                >
                    Page Not Found
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ marginBottom: 4 }}
                >
                    The page you are looking for does not exist. It might have been moved, deleted, or you entered the wrong URL.
                </Typography>

                <Button
                    component={Link}
                    to="/activities"
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