import agent from "../api/agent.ts";
import type {LoginSchema} from "../schemas/loginSchema.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {User} from "../types";
import {useNavigate} from "react-router";
import type {RegisterSchema} from "../schemas/registerSchema.ts";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";


export const useAccount = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);

        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            })
        },
    });

    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) && location.pathname !== '/login' && location.pathname !== '/register'  // Only fetch if not already cached,
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: async () => {
            queryClient.removeQueries({
                queryKey: ['user']
            });
            queryClient.removeQueries({
                queryKey: ['activities']
            });
            await navigate('/login');
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        }
        ,
        onSuccess: async () => {
            toast.success('Registration successful, you can now login');
            await navigate('/login');
        }
    });

    return {
        loginUser,
        loadingUserInfo,
        currentUser,
        logoutUser,
        registerUser,
    }
}