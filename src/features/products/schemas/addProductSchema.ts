import z from 'zod';
// src/features/products/schemas/addProductSchema.ts
export const productSchema = z
  .object({
    title: z.string().min(2, 'Минимум 2 символа'),
    type: z.enum(['monitors', 'tablets', 'laptops'], {
      message: 'Выберите тип',
    }),
    serialNumber: z.string().min(1, 'Обязательное поле'),
    isNewProduct: z.boolean(),
    priceUSD: z
      .number({ error: 'Введите число' })
      .positive('Должно быть больше 0'),
    priceUAH: z
      .number({ error: 'Введите число' })
      .positive('Должно быть больше 0'),
    guaranteeStart: z.string().min(1, 'Укажите дату'),
    guaranteeEnd: z.string().min(1, 'Укажите дату'),
    order: z.number({ error: 'Выберите приход' }).min(1, 'Выберите приход'),
  })
  .refine((data) => data.guaranteeEnd >= data.guaranteeStart, {
    message: 'Дата окончания не может быть раньше начала',
    path: ['guaranteeEnd'],
  });

export type ProductFormValues = z.infer<typeof productSchema>;
