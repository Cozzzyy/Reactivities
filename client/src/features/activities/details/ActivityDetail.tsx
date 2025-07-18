import Card from "@mui/material/Card";
import {Button, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

export function ActivityDetail() {
    const navigator = useNavigate();
    const {id} = useParams()
    const {activity, isLoadingActivity} = useActivities(id)

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;


    return (
        <Card sx={{borderRadius: 3}}>
            <CardMedia component={'img'} src={`/images/categoryImages/${activity.category}.jpg`}/>
            <CardContent>
                <Typography variant='h5'>{activity.title}</Typography>
                <Typography variant='subtitle1' fontWeight={'light'}>{activity.date}</Typography>
                <Typography variant='body1'>{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button  onClick={() => navigator(`/manage/${activity.id}`)} color="primary">Edit</Button>
                <Button onClick={() => navigator('/activities')} color={'inherit'}>Cancel</Button>
            </CardActions>

        </Card>
    );
}