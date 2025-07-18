import {Grid} from "@mui/material";
import ActivityList from "./ActivityList.tsx";
import ActivityFilters from "./ActivityFilters.tsx";


export default function ActivityDashboard() {
    return (
        <Grid container justifyContent={"space-between"} spacing={5} sx={{mt: 3}}>
            <Grid size={8}>
                <ActivityList/>
            </Grid>
            <Grid size={4}>
                <ActivityFilters/>
            </Grid>
        </Grid>
    );
}