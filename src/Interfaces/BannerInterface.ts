import { z } from 'zod';

export const bannerSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.'
  }).min(3, { message: 'Name must be at least 3 characters long.' }),
  image: z.string().optional(),
  customerID: z.any(),
  endAt: z.string({
    invalid_type_error: 'endAt must be a string.',
    required_error: 'endAt is required.'
  }),
  startAt: z.string({
    invalid_type_error: 'startAt must be a string.',
    required_error: 'startAt is required.'
  }),
  status: z.boolean(),
  _id: z.any().optional()
});

export const bannerSchemaUpdate = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.'
  }).min(3, { message: 'Name must be at least 3 characters long.' }),
  image: z.string().optional(),
  customerID: z.any(),
  endAt: z.string({
    invalid_type_error: 'endAt must be a string.',
    required_error: 'endAt is required.'
  }),
  startAt: z.string({
    invalid_type_error: 'startAt must be a string.',
    required_error: 'startAt is required.'
  }),
  status: z.boolean().optional()
});

export type Banner = z.infer<typeof bannerSchema>;
export type BannerUpdate = z.infer<typeof bannerSchemaUpdate>;
