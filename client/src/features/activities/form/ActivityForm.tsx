import {Button, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {activitySchema, type ActivitySchema} from "../../../lib/schemas/activitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput.tsx";
import SelectInput from "../../../app/shared/components/SelectInput.tsx";
import {categoryOptions} from "./categoryOptions.ts";
import DateTimeInput from "../../../app/shared/components/DateTimeInput.tsx";
import LocationInput from "../../../app/shared/components/LocationInput.tsx";

export default function ActivityForm() {
    const { reset, handleSubmit, control} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    })
    const navigator = useNavigate();
    const {id} = useParams();
    const {activity,updateActivity, createActivity} = useActivities(id);

    useEffect(() => {
        if(activity) reset({
            ...activity,
            location: {
                venue: activity.venue,
                city: activity.city || '',
                latitude: activity.latitude,
                longitude: activity.longitude
            }
        });
    },[activity, reset]);


    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest} = data;
        const flattendData = {
            ...rest, ...location};

        try {
            if (activity) {
                updateActivity.mutate({...activity, ...flattendData, id: activity.id}, {
                    onSuccess: () => {
                        navigator('/activities');
                    }
                });
            } else {
                createActivity.mutate(flattendData, {
                    onSuccess: () => {
                        navigator('/activities');
                    }
                });
            }
            navigator('/activities');
        } catch (error) {
            console.error('Error submitting activity:', error);
            // Optionally, you can show an error message to the user here
        }


    }

    return (
        <Paper sx={{borderRadius: 3, p: 3}}>
            <Typography variant={'h5'} gutterBottom color={"primary"}>
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={3}>
                <TextInput name="title" label='Title' control={control} defaultValue={activity?.title || ''} />
                <TextInput name="description" label='Description'  control={control} defaultValue={activity?.description || ''} multiline rows={3} />
                <Box display={'flex'} gap={2}>
                    <SelectInput label='Category' control={control} name={'category'} items={categoryOptions} defaultValue={activity?.category || ''}/>
                    <DateTimeInput
                        name="date"
                        label="Date"
                        control={control}
                    />
                </Box>
                <LocationInput control={control} label={'Enter the location'} name="location" />
                <Box display={'flex'} justifyContent={'end'} gap={3}>
                    <Button onClick={() => navigator('/activities')} color={'inherit'}>Cancel</Button>
                    <Button disabled={updateActivity.isPending || createActivity.isPending} type={"submit"} color={'success'} variant={'contained'}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    );
}