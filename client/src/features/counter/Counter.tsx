import {useStore} from "../../lib/hooks/useStore.ts";
import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {List, ListItem, ListItemText} from "@mui/material";

const Counter = observer(function Counter() {
    const {counterStore} = useStore();

    return (
        <Box
            component={Paper}
            elevation={4}
            sx={{
                p: 4,
                borderRadius: 4,
                maxWidth: 500,
                mx: "auto",
                mt: 6,
                textAlign: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
        >
            <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
                {counterStore.title}
            </Typography>
            <Typography variant="h6" mb={3}>
                Current count: <span style={{fontWeight: 700, color: "#1976d2"}}>{counterStore.count}</span>
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => counterStore.increment()}
                >
                    Increment
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => counterStore.decrement()}
                >
                    Decrement
                </Button>
                <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => counterStore.reset()}
                >
                    Reset
                </Button>
            </Stack>
            <Box sx={{width: '100%', mt: 4, display: 'flex', flexDirection:'column', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" color="text.secondary">
                    Counter events: {counterStore.eventCount}
                </Typography>
                <List>
                    {counterStore.events.map((event, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={event} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
});

export default Counter;