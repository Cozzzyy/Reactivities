import './index.css'
import {useState} from "react";
import type {Activity} from "../../lib/types";
import {Container, CssBaseline, Typography} from "@mui/material";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import Box from "@mui/material/Box";
import {useActivities} from "../../lib/hooks/useActivities.ts";

function App() {
    const [editMode, setEditMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const {activities, isPending} = useActivities();

    const handleActivitySelect = (id: string) => {
        setSelectedActivity(activities!.find(activity => activity.id === id));
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


    return (
        <Box sx={{bgcolor: '#e6e5e5', minHeight: '100vh'}}>
            <CssBaseline/>
            <NavBar handleOpenCreateForm={handleOpenCreateForm} />
            <Container maxWidth='xl' sx={{mt: 3}}>
                {!activities || isPending ? (
                    <Typography>
                        Loading activities...
                    </Typography>
                ) : (
                    <ActivityDashboard
                        activities={activities}
                        handleActivitySelect={handleActivitySelect}
                        handleCancelSelect={handleCancelSelect}
                        handleOpenForm={handleOpenForm}
                        editMode={editMode}
                        selectedActivity={selectedActivity}
                        handleCloseForm={handleCloseForm}
                    />
                )}

            </Container>
        </Box>
    )
}

export default App
