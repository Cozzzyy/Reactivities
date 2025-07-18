import './index.css'
import {useEffect, useState} from "react";
import type {Activity} from "../../lib/types";
import {Container, CssBaseline} from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import Box from "@mui/material/Box";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {
        axios.get('https://localhost:5001/api/activities')
            .then(response => setActivities(response.data))
            .catch(error => console.error('Error fetching activities:', error));

        return () => { }
    }, [])

    const handleActivitySelect = (id: string) => {
        setSelectedActivity(activities.find(activity => activity.id === id));
    }

    const handleCancelSelect = () => {
        setSelectedActivity(undefined);
    }

    const handleOpenForm = (id?: string) => {
        if (id) handleActivitySelect(id);
        else handleCancelSelect();
        setEditMode(true);
    }

    const handleCloseForm = () => {
        setEditMode(false);
    }

    const handleOpenCreateForm = () => {
        setSelectedActivity(undefined);
        setEditMode(true);
    }

    const handleSubmitForm = (activity: Activity) => {
        if (activity.id) {
            setActivities(activities.map(a => a.id === activity.id ? activity : a))
        } else {
            const newActivity = {...activity, id: Math.random().toString()}
            setActivities([...activities, {...newActivity}]);
        }
        handleCloseForm();
    }

    const handleDeleteActivity = (id: string) => {
        setActivities(activities.filter(activity => activity.id !== id));
        handleCancelSelect();
    }

    return (
        <Box sx={{bgcolor: '#e6e5e5'}}>
            <CssBaseline/>
            <NavBar handleOpenCreateForm={handleOpenCreateForm} />
            <Container maxWidth='xl' sx={{mt: 3}}>
                <ActivityDashboard
                    activities={activities}
                    handleActivitySelect={handleActivitySelect}
                    handleCancelSelect={handleCancelSelect}
                    handleOpenForm={handleOpenForm}
                    editMode={editMode}
                    selectedActivity={selectedActivity}
                    handleCloseForm={handleCloseForm}
                    submitForm={handleSubmitForm}
                    handleDeleteActivity={handleDeleteActivity}
                />
            </Container>
        </Box>
    )
}

export default App
