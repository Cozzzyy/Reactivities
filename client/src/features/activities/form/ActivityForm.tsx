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

export default function ActivityForm() {
    const { reset, handleSubmit, control} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    })
    const navigator = useNavigate();
    const {id} = useParams();
    const {activity,updateActivity, createActivity} = useActivities(id);

    useEffect(() => {
        if(activity) reset(activity);
    },[activity, reset]);


    const onSubmit = (data: ActivitySchema) => {
        console.log(data);
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
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} display={'flex'} flexDirection={'column'} gap={3}>
                <TextInput name="title" label='Title' control={control} defaultValue={activity?.title || ''} />
                <TextInput name="description" label='Description'  control={control} defaultValue={activity?.description || ''} multiline rows={3} />
                <SelectInput label='Category' control={control} name={'category'} items={categoryOptions}/>
                <TextInput
                    name="date"
                    label="Date"
                    control={control}
                    defaultValue={formatDateForInput(activity?.date)}
                    type="datetime-local"
                />
                <TextInput name="city" label='City' control={control} defaultValue={activity?.city || ''} />
                <TextInput name="venue" label='Venue' control={control} defaultValue={activity?.venue || ''} />
                <Box display={'flex'} justifyContent={'end'} gap={3}>
                    <Button onClick={() => navigator('/activities')} color={'inherit'}>Cancel</Button>
                    <Button disabled={updateActivity.isPending || createActivity.isPending} type={"submit"} color={'success'} variant={'contained'}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    );
}