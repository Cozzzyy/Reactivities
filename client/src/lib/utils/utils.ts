
import {type DateArg, format} from "date-fns";
import {z} from "zod";

export function formatDate(date: DateArg<Date>): string {
    return format(date, 'dd MMM yyyy hh:mm');
}

export const requiredString = (fieldName: string) => z.string().min(1, {
    message: `${fieldName} is required`
});