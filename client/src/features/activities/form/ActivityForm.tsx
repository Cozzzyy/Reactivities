import {Button, Paper, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import type {Activity} from "../../../lib/types";
import type {FormEvent} from "react";
import {useActivities} from "../../../lib/hooks/useActivities.ts";


interface ActivityFormProps {
    activity? : Activity
    handleCloseForm: () => void;
}

export default function ActivityForm({activity, handleCloseForm}: ActivityFormProps) {

    const {updateActivity, createActivity} = useActivities();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data : {[key: string]: FormDataEntryValue} = {}
        formData.forEach((value, key) => {
            if (key === 'date') {
                const dateValue = value as string;
                const dateObj = new Date(dateValue);
                data[key] = isNaN(dateObj.getTime()) ? '' : dateObj.toISOString();
            } else {
                data[key] = value;
            }
        });

        if(activity){
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
        }else{
            await createActivity.mutateAsync(data as unknown as Activity);
        }

        handleCloseForm();
    }

    function formatDateForInput(date?: string) {
        if (!date) return '';
        const d = new Date(date);
        // Pad month, day, hours, minutes
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }


    return (
        <Paper sx={{borderRadius: 3, p: 3}}>
            <Typography variant={'h5'} gutterBottom color={"primary"}>
                Create activity
            </Typography>
            <Box component={'form'} onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} gap={3}>
                <TextField name={"title"} defaultValue={activity?.title} label={'Title'}></TextField>
                <TextField name={"description"} defaultValue={activity?.description} multiline rows={3} label={'Description'}></TextField>
                <TextField name={"category"} defaultValue={activity?.category} label={'Category'}></TextField>
                <TextField
                    name={"date"}
                    defaultValue={formatDateForInput(activity?.date)}
                    label="Date"
                    type="datetime-local"
                />
                <TextField name={"city"} defaultValue={activity?.city} label={'City'}></TextField>
                <TextField name={"venue"} defaultValue={activity?.venue} label={'Venue'}></TextField>
                <Box display={'flex'} justifyContent={'end'} gap={3}>
                    <Button onClick={handleCloseForm} color={'inherit'}>Cancel</Button>
                    <Button disabled={updateActivity.isPending || createActivity.isPending} type={"submit"} color={'success'} variant={'contained'}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    );
}