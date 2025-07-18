import type {Activity} from "../../../lib/types";
import {Avatar, Button, Card, CardContent, CardHeader, Chip, Divider, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router";
import {AccessTime, Place} from "@mui/icons-material";
import {formatDate} from "../../../lib/utils/utils.ts";

interface ActivityCardProps {
    activity: Activity;
}

export default function ActivityCard({activity}: ActivityCardProps) {

    const isHost = false;
    const isGoing = false;
    const label = isGoing ? 'You are going' : isHost ? 'You are hosting' : 'You are not going';
    const isCancelled = false;
    const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

    return (
        <Card sx={{borderRadius: 3}}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <CardHeader
                    avatar={<Avatar sx={{height: 80, width: 80}}/>}
                    title={activity.title}
                    titleTypographyProps={{
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                    subheader={
                        <>
                            Hosted by {''} <Link to={`/profiles/bob`}>Bob</Link>
                        </>
                    }
                />
                <Box display={'flex'} flexDirection={'column'} mr={2}>
                    {(isHost || isGoing)} <Chip label={label} color={color} size="small" sx={{mb: 1}}/>
                    {isCancelled && <Chip label="Cancelled" color="error" size="small" sx={{mb: 1, borderRadius: 2}}/>}
                </Box>
            </Box>
            <Divider sx={{mb: 3}}/>
            <CardContent>
                <Box display={'flex'} alignItems={'center'} mb={2} px={2}>
                    <Box display={'flex'} gap={1} sx={{flexGrow: 0}}>
                        <AccessTime sx={{mr: 1}}/>
                        <Typography variant='body2'
                                    noWrap={true}>{formatDate(activity.date)}</Typography>
                    </Box>
                    <Place sx={{ml: 3, mr: 1}}/>
                    <Typography variant='body2'>{activity.venue}</Typography>
                </Box>
                <Divider/>
                <Box display={'flex'} gap={2} sx={{backgroundColor: 'grey.200', py: 3, pl: 2}}>
                    Attendees go here
                </Box>
            </CardContent>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
                <Typography variant='body2' color='text.secondary'>
                    {activity.description}
                </Typography>
                <Box sx={{display: 'flex', gap: 2}}>
                    <Button component={Link} to={`/activities/${activity.id}`} onClick={() => {
                    }} size="medium" variant="contained"
                            sx={{display: 'flex', justifySelf: 'self-end', borderRadius: 3}}>View</Button>
                </Box>
            </CardContent>
        </Card>
    );
}