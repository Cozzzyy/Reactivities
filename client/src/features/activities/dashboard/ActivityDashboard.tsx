import {Grid} from "@mui/material";
import type {Activity} from "../../../lib/types";
import ActivityList from "./ActivityList.tsx";
import {ActivityDetail} from "../details/ActivityDetail.tsx";
import ActivityForm from "../form/ActivityForm.tsx";

interface ActivityDashboardProps {
    activities : Activity[]
    handleActivitySelect: (id: string) => void;
    handleCancelSelect: () => void;
    handleOpenForm: (id?: string) => void;
    editMode: boolean;
    selectedActivity?: Activity;
    handleCloseForm: () => void;
    submitForm: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, handleDeleteActivity, submitForm, selectedActivity, handleActivitySelect, handleCancelSelect, handleCloseForm, handleOpenForm, editMode} : ActivityDashboardProps) {
    return (
        <Grid container spacing={2} sx={{mt: 3}}>
            <Grid size={7}>
                <ActivityList activities={activities} handleDeleteActivity={handleDeleteActivity} handleActivitySelect={handleActivitySelect}/>
            </Grid>
            <Grid size={5}>
                {(selectedActivity && !editMode) && (
                    <ActivityDetail
                        handleCancelSelect={handleCancelSelect}
                        handleOpenForm={handleOpenForm}
                        activity={selectedActivity } />
                )}
                {(editMode) && (
                    <ActivityForm
                        submitForm={submitForm}
                        handleCloseForm={handleCloseForm}
                        activity={selectedActivity} />
                )}
            </Grid>
        </Grid>
    );
}