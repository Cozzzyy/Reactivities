import { Grid, Typography} from "@mui/material";
import {useParams} from "react-router";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import ActivityDetailsHeader from "./ActivityDetailsHeader.tsx";
import ActivityDetailsChat from "./ActivityDetailsChat.tsx";
import ActivityDetailsInfo from "./ActivityDetailsInfo.tsx";
import ActivityDetailSidebar from "./ActivityDetailSidebar.tsx";

export function ActivityDetailPage() {
    const {id} = useParams()
    const {activity, isLoadingActivity} = useActivities(id)

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </Grid>
            <Grid size={4}>
                <ActivityDetailSidebar/>
            </Grid>
        </Grid>
    );
}