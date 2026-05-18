import z from "zod";

export const updateCustomerSchema = z.object({
    name: z.string().min(3, "Name must be at least 2 characters"),
    age: z.number().int().positive("age must be a valid number")
})

export type CustomerUpdate = z.infer<typeof updateCustomerSchema>