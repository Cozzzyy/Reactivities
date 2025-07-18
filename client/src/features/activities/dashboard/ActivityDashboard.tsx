import {Grid} from "@mui/material";
import ActivityList from "./ActivityList.tsx";


export default function ActivityDashboard() {
    return (
        <Grid container spacing={2} sx={{mt: 3}}>
            <Grid size={7}>
                <ActivityList/>
            </Grid>
            <Grid size={5}>
                Activity filters
            </Grid>
        </Grid>
    );
}