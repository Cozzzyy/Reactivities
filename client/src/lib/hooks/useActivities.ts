import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {Activity} from "../types";
import agent from "../api/agent.ts";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();

    const {data: activities, isPending} = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },
    });

    const {data: activity, isLoading: isLoadingActivity} = useQuery({
        queryKey: ['activities', id],
        queryFn: async (context) => {
            const activityId = context.queryKey[1];
            const response = await agent.get<Activity>(`/activities/${activityId}`);
            return response.data;
        },
        enabled: !!id, // Only run if id is provided
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put(`/activities`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response =  await agent.post(`/activities`, activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    return {
        activities,
        isPending,
        updateActivity,
        deleteActivity,
        createActivity,
        activity,
        isLoadingActivity
    };
};