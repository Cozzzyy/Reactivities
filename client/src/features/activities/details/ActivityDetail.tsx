import Card from "@mui/material/Card";
import type {Activity} from "../../../lib/types";
import {Button, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

interface ActivityDetailProps {
    activity: Activity;
    handleCancelSelect: () => void;
    handleOpenForm: (id?: string) => void;
}

export function ActivityDetail({activity, handleCancelSelect, handleOpenForm}: ActivityDetailProps) {
    return (
        <Card sx={{borderRadius: 3}}>
            <CardMedia component={'img'} src={`/images/categoryImages/${activity.category}.jpg`}/>
            <CardContent>
                <Typography variant='h5'>{activity.title}</Typography>
                <Typography variant='subtitle1' fontWeight={'light'}>{activity.date}</Typography>
                <Typography variant='body1'>{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleOpenForm(activity.id)} color="primary">Edit</Button>
                <Button onClick={handleCancelSelect} color={'inherit'}>Cancel</Button>
            </CardActions>

        </Card>
    );
}