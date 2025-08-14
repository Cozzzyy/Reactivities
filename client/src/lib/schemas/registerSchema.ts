import { z } from 'zod';
import {requiredString} from "../utils/utils.ts";

export const registerSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
    displayName: requiredString('displayName'),
    password: requiredString('password'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;