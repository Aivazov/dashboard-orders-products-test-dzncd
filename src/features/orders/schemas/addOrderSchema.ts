import z from 'zod';

export const orderSchema = z.object({
  title: z.string().min(2, 'Минимум 2 символа'),
  description: z.string().min(5, 'Минимум 5 символов'),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
