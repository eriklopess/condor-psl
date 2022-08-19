import { z } from 'zod';

export const bannerSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  customerID: z.any(),
  endAt: z.string(),
  startAt: z.string(),
  status: z.boolean(),
  _id: z.any().optional()
});

export const bannerSchemaUpdate = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  customerID: z.any().optional(),
  endAt: z.string().optional(),
  startAt: z.string().optional(),
  status: z.boolean().optional(),
  _id: z.any().optional()
});

export type Banner = z.infer<typeof bannerSchema>;
export type BannerUpdate = z.infer<typeof bannerSchemaUpdate>;
