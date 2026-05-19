// src/features/products/schemas/addProductSchema.ts

import z from 'zod';

export const getProductSchema = (t: any) =>
  z
    .object({
      title: z.string().min(2, t('errors.minLength', { count: 2 })),
      type: z.enum(['monitors', 'tablets', 'laptops'], {
        message: t('fields.type.placeholder'),
      }),
      serialNumber: z.string().min(1, t('errors.required')),
      isNewProduct: z.boolean(),
      priceUSD: z
        .number({ message: t('errors.enterNumber') })
        .positive(t('errors.positiveNumber')),
      priceUAH: z
        .number({ message: t('errors.enterNumber') })
        .positive(t('errors.positiveNumber')),
      guaranteeStart: z.string().min(1, t('fields.date.placeholder')),
      guaranteeEnd: z.string().min(1, t('fields.date.placeholder')),
      order: z.number({ message: t('fields.order.placeholder') }),
    })
    .refine((data) => data.guaranteeEnd >= data.guaranteeStart, {
      message: t('errors.dateOrder'),
      path: ['guaranteeEnd'],
    });

export type ProductFormValues = z.infer<ReturnType<typeof getProductSchema>>;
