import { CalendarToday, Info, Place } from "@mui/icons-material";
import {Button, Divider, Grid, Paper, Typography} from "@mui/material";
import type {Activity} from "../../../lib/types";
import {formatDate} from "../../../lib/utils/utils.ts";
import {useState} from "react";
import MapComponent from "../../../app/shared/components/MapComponent.tsx";
import Box from "@mui/material/Box";

type ActivityDetailsInfoProps = {
    activity : Activity;
}

export default function ActivityDetailsInfo({ activity }: ActivityDetailsInfoProps) {
    const [mapOpen, setMapOpen] = useState(true);

    return (
        <Paper sx={{ mb: 2 }}>
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{activity.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{formatDate(activity.date)}</Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button onClick={() => setMapOpen(!mapOpen)} sx={{ mt: 1 }} variant="outlined" color="info">
                        <Typography>
                            {mapOpen ? 'Hide Map' : 'Show Map'}
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

            {mapOpen && (
                    <Box sx={{
                        height: 400,
                        m: 2,
                        borderRadius: 1,
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0',
                        display: 'block'
                    }}>
                        <MapComponent venue={activity.venue} position={[activity.latitude, activity.longitude]} />
                    </Box>
            )}
        </Paper>
    )
}