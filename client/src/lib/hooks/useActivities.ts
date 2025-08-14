import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {Activity} from "../types";
import agent from "../api/agent.ts";
import {useAccount} from "./useAccount.ts";
import {useLocation} from "react-router-dom";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const {currentUser} = useAccount();
    const location = useLocation();

    const {data: activities, isLoading} = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },

        enabled: !id && !!currentUser && location.pathname === '/activities' // Only fetch if user is logged in
    });

    const {data: activity, isLoading: isLoadingActivity} = useQuery({
        queryKey: ['activities', id],
        queryFn: async (context) => {
            const activityId = context.queryKey[1];
            const response = await agent.get<Activity>(`/activities/${activityId}`);
            return response.data;
        },
        enabled: !!id && !!currentUser, // Only fetch if id is provided and user is logged in
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
        isLoading,
        updateActivity,
        deleteActivity,
        createActivity,
        activity,
        isLoadingActivity
    };
};