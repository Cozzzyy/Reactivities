import { z } from 'zod';

const requiredString = (fieldName: string) => z.string().min(1, {
    message: `${fieldName} is required`
});

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.date({
        message: 'Date is required'
    }).refine(date => !isNaN(date.getTime()), {
        message: 'Invalid date format'
    }),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.number(),
        longitude: z.number()
    })
})

export type ActivitySchema = z.infer<typeof activitySchema>