import './App.css'
import {useEffect, useState} from "react";
import type {Activity} from "./lib/types";
import {ListItem, Typography} from "@mui/material";
import axios from "axios";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get('https://localhost:5001/api/activities')
            .then(response => setActivities(response.data))
            .catch(error => console.error('Error fetching activities:', error));
    }, [])

    return (
        <>
            <Typography variant={'h3'}>Reactivities</Typography>
                {activities.map(activity => (
                    <ListItem key={activity.id}>
                        {activity.title}
                    </ListItem>
                ))}
        </>
    )
}

export default App
