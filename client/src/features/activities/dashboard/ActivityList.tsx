import Box from "@mui/material/Box";
import type {Activity} from "../../../lib/types";
import ActivityCard from "./ActivityCard.tsx";

interface ActivityListProps {
    activities: Activity[];
    handleActivitySelect: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

export default function ActivityList({activities, handleDeleteActivity, handleActivitySelect}: ActivityListProps) {
    return(
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {activities.map(activity => (
            <ActivityCard key={activity.id} handleDeleteActivity={handleDeleteActivity} activity={activity} handleActivitySelect={handleActivitySelect}/>
        ))}
    </Box>
    );
}
