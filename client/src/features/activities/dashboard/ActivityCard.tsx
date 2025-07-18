import type {Activity} from "../../../lib/types";
import {Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

interface ActivityCardProps {
    activity: Activity;
    handleActivitySelect: (id: string) => void;
}

export default function ActivityCard({activity, handleActivitySelect}: ActivityCardProps) {

    const {deleteActivity} = useActivities();


    const handleDeleteActivity = async (id: string) => {
        await deleteActivity.mutateAsync(id);
    }

    return (
        <Card sx={{borderRadius: 3}}>
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="h5" sx={{color: 'text.secondary', mb: 1}}>{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
                <Chip label={activity.category} variant="outlined"/>
                <Box sx={{display: 'flex', gap: 1}}>
                    <Button onClick={() => handleActivitySelect(activity.id)} size="medium" variant="contained">View</Button>
                <Button disabled={deleteActivity.isPending} onClick={() => handleDeleteActivity(activity.id)} size="medium" variant="outlined" color={'error'}>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    );
}