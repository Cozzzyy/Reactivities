import Card from "@mui/material/Card";
import type {Activity} from "../../../lib/types";
import {Button, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

interface ActivityDetailProps {
    activity: Activity;
    handleCancelSelect: () => void;
    handleOpenForm: (id?: string) => void;
}

export function ActivityDetail({activity, handleCancelSelect, handleOpenForm}: ActivityDetailProps) {

    const {activities} = useActivities();
    const selectedActivity = activities!.find(a => a.id === activity.id)!;

    return (
        <Card sx={{borderRadius: 3}}>
            <CardMedia component={'img'} src={`/images/categoryImages/${selectedActivity.category}.jpg`}/>
            <CardContent>
                <Typography variant='h5'>{selectedActivity.title}</Typography>
                <Typography variant='subtitle1' fontWeight={'light'}>{selectedActivity.date}</Typography>
                <Typography variant='body1'>{selectedActivity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleOpenForm(activity.id)} color="primary">Edit</Button>
                <Button onClick={handleCancelSelect} color={'inherit'}>Cancel</Button>
            </CardActions>

        </Card>
    );
}