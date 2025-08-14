import Box from "@mui/material/Box";
import ActivityCard from "./ActivityCard.tsx";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {Typography} from "@mui/material";


export default function ActivityList() {
    const {activities, isLoading} = useActivities();

    if(!activities || isLoading) return <Typography>Loading activities...</Typography>;

    return(
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity}/>
        ))}
    </Box>
    );
}
